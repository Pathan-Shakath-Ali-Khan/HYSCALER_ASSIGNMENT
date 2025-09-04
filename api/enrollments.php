<?php
require __DIR__ . '/db.php';
$pdo = db_conn();
$action = $_GET['action'] ?? '';

if (!isset($_SESSION['user_id'])) json_out(['error' => 'Unauthorized'], 401);
$userId = $_SESSION['user_id'];

switch ($action) {
    case 'enroll':
        require_method('POST');
        $in = input_json();
        $courseId = $in['courseId'] ?? '';
        if (!$courseId) json_out(['error' => 'Missing courseId'], 400);
        $pdo->prepare('INSERT IGNORE INTO enrollments (user_id, course_id, enrolled_at) VALUES (?, ?, NOW())')->execute([$userId, $courseId]);
        $pdo->prepare('INSERT IGNORE INTO progress (user_id, course_id) VALUES (?, ?)')->execute([$userId, $courseId]);
        json_out(['ok' => true]);
        break;
    case 'mine':
        require_method('GET');
        $stmt = $pdo->prepare('SELECT e.course_id, p.progress_pct, p.seconds_watched, p.certificate_earned FROM enrollments e LEFT JOIN progress p ON p.user_id = e.user_id AND p.course_id = e.course_id WHERE e.user_id = ?');
        $stmt->execute([$userId]);
        json_out(['enrollments' => $stmt->fetchAll()]);
        break;
    default:
        json_out(['error' => 'Unknown action'], 404);
}


