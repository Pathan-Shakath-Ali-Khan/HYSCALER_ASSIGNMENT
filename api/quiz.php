<?php
require __DIR__ . '/db.php';
$pdo = db_conn();
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'add':
        require_method('POST');
        if (!isset($_SESSION['user_id'])) json_out(['error' => 'Unauthorized'], 401);
        $u = $pdo->prepare('SELECT role FROM users WHERE id = ?');
        $u->execute([$_SESSION['user_id']]);
        $role = $u->fetchColumn();
        if ($role !== 'admin') json_out(['error' => 'Forbidden'], 403);
        $in = input_json();
        $id = bin2hex(random_bytes(8));
        $stmt = $pdo->prepare('INSERT INTO quiz_questions (id, course_id, question, options_json, correct_index) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$id, $in['courseId'] ?? '', $in['q'] ?? '', json_encode($in['options'] ?? []), intval($in['correctIndex'] ?? 0)]);
        json_out(['ok' => true, 'id' => $id]);
        break;
    case 'list':
        require_method('GET');
        $courseId = $_GET['courseId'] ?? '';
        $stmt = $pdo->prepare('SELECT id, question AS q, options_json, correct_index FROM quiz_questions WHERE course_id = ?');
        $stmt->execute([$courseId]);
        $rows = $stmt->fetchAll();
        $quiz = array_map(function($r){ return ['id' => $r['id'], 'q' => $r['q'], 'options' => json_decode($r['options_json'], true), 'correctIndex' => intval($r['correct_index'])]; }, $rows);
        json_out(['quiz' => $quiz]);
        break;
    case 'score':
        require_method('POST');
        if (!isset($_SESSION['user_id'])) json_out(['error' => 'Unauthorized'], 401);
        $in = input_json();
        $stmt = $pdo->prepare('REPLACE INTO quiz_scores (user_id, course_id, quiz_id, score_pct, taken_at) VALUES (?, ?, ?, ?, NOW())');
        $stmt->execute([$_SESSION['user_id'], $in['courseId'] ?? '', $in['quizId'] ?? 'main', intval($in['scorePct'] ?? 0)]);
        json_out(['ok' => true]);
        break;
    default:
        json_out(['error' => 'Unknown action'], 404);
}


