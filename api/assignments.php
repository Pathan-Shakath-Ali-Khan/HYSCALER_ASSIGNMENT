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
        $stmt = $pdo->prepare('INSERT INTO assignments (id, course_id, title, description, due_date, created_at) VALUES (?, ?, ?, ?, ?, NOW())');
        $due = empty($in['dueDate']) ? null : $in['dueDate'];
        $stmt->execute([$id, $in['courseId'] ?? '', $in['title'] ?? '', $in['description'] ?? '', $due]);
        json_out(['ok' => true, 'id' => $id]);
        break;

    case 'list':
        require_method('GET');
        $courseId = $_GET['courseId'] ?? '';
        $stmt = $pdo->prepare('SELECT id, course_id, title, description, due_date, created_at FROM assignments WHERE course_id = ? ORDER BY created_at DESC');
        $stmt->execute([$courseId]);
        json_out(['assignments' => $stmt->fetchAll()]);
        break;

    case 'submit':
        require_method('POST');
        if (!isset($_SESSION['user_id'])) json_out(['error' => 'Unauthorized'], 401);
        $in = input_json();
        $id = bin2hex(random_bytes(8));
        $stmt = $pdo->prepare('REPLACE INTO assignment_submissions (id, assignment_id, user_id, answer_text, attachment_url, submitted_at) VALUES (?, ?, ?, ?, ?, NOW())');
        $stmt->execute([$id, $in['assignmentId'] ?? '', $_SESSION['user_id'], $in['answerText'] ?? '', $in['attachmentUrl'] ?? '']);
        json_out(['ok' => true]);
        break;

    case 'mine':
        require_method('GET');
        if (!isset($_SESSION['user_id'])) json_out(['error' => 'Unauthorized'], 401);
        $courseId = $_GET['courseId'] ?? '';
        $stmt = $pdo->prepare('SELECT s.assignment_id, s.answer_text, s.attachment_url, s.submitted_at FROM assignment_submissions s JOIN assignments a ON a.id = s.assignment_id WHERE s.user_id = ? AND a.course_id = ?');
        $stmt->execute([$_SESSION['user_id'], $courseId]);
        json_out(['submissions' => $stmt->fetchAll()]);
        break;

    default:
        json_out(['error' => 'Unknown action'], 404);
}


