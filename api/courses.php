<?php
require __DIR__ . '/db.php';

$action = $_GET['action'] ?? '';
$pdo = db_conn();

switch ($action) {
    case 'list':
        $stmt = $pdo->query('SELECT id, title, description, category, thumb_text, video_url, created_at FROM courses ORDER BY created_at DESC');
        json_out(['courses' => $stmt->fetchAll()]);
        break;

    case 'add':
        require_method('POST');
        if (!isset($_SESSION['user_id'])) json_out(['error' => 'Unauthorized'], 401);
        // ensure admin
        $u = $pdo->prepare('SELECT role FROM users WHERE id = ?');
        $u->execute([$_SESSION['user_id']]);
        $role = $u->fetchColumn();
        if ($role !== 'admin') json_out(['error' => 'Forbidden'], 403);
        $in = input_json();
        $id = bin2hex(random_bytes(8));
        $thumb = strtoupper(substr(preg_replace('/[^A-Za-z]/', '', ($in['title'] ?? '??')), 0, 4));
        $stmt = $pdo->prepare('INSERT INTO courses (id, title, description, category, thumb_text, video_url, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())');
        $stmt->execute([$id, $in['title'] ?? '', $in['description'] ?? '', $in['category'] ?? '', $thumb, $in['videoUrl'] ?? '']);
        json_out(['ok' => true, 'id' => $id]);
        break;

    case 'delete':
        require_method('POST');
        if (!isset($_SESSION['user_id'])) json_out(['error' => 'Unauthorized'], 401);
        $u = $pdo->prepare('SELECT role FROM users WHERE id = ?');
        $u->execute([$_SESSION['user_id']]);
        $role = $u->fetchColumn();
        if ($role !== 'admin') json_out(['error' => 'Forbidden'], 403);
        $in = input_json();
        $id = $in['id'] ?? '';
        if (!$id) json_out(['error' => 'Missing id'], 400);
        $pdo->prepare('DELETE FROM course_resources WHERE course_id = ?')->execute([$id]);
        $pdo->prepare('DELETE FROM quiz_questions WHERE course_id = ?')->execute([$id]);
        $pdo->prepare('DELETE FROM enrollments WHERE course_id = ?')->execute([$id]);
        $pdo->prepare('DELETE FROM progress WHERE course_id = ?')->execute([$id]);
        $pdo->prepare('DELETE FROM quiz_scores WHERE course_id = ?')->execute([$id]);
        $pdo->prepare('DELETE FROM courses WHERE id = ?')->execute([$id]);
        json_out(['ok' => true]);
        break;

    default:
        json_out(['error' => 'Unknown action'], 404);
}


