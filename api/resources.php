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
        $stmt = $pdo->prepare('INSERT INTO course_resources (id, course_id, type, name, url) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$id, $in['courseId'] ?? '', $in['type'] ?? 'pdf', $in['name'] ?? '', $in['url'] ?? '']);
        json_out(['ok' => true, 'id' => $id]);
        break;
    case 'list':
        require_method('GET');
        $courseId = $_GET['courseId'] ?? '';
        $stmt = $pdo->prepare('SELECT id, type, name, url FROM course_resources WHERE course_id = ?');
        $stmt->execute([$courseId]);
        json_out(['resources' => $stmt->fetchAll()]);
        break;
    default:
        json_out(['error' => 'Unknown action'], 404);
}


