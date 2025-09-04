<?php
require __DIR__ . '/db.php';
$pdo = db_conn();

if (!isset($_SESSION['user_id'])) json_out(['error' => 'Unauthorized'], 401);
$userId = $_SESSION['user_id'];
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'watch':
        require_method('POST');
        $in = input_json();
        $courseId = $in['courseId'] ?? '';
        $seconds = intval($in['seconds'] ?? 0);
        if (!$courseId || $seconds <= 0) json_out(['error' => 'Invalid input'], 400);
        $stmt = $pdo->prepare('UPDATE progress SET seconds_watched = seconds_watched + ? WHERE user_id = ? AND course_id = ?');
        $stmt->execute([$seconds, $userId, $courseId]);
        json_out(['ok' => true]);
        break;
    case 'update':
        require_method('POST');
        $in = input_json();
        $courseId = $in['courseId'] ?? '';
        $pct = max(0, min(100, intval($in['progressPct'] ?? 0)));
        if (!$courseId) json_out(['error' => 'Invalid input'], 400);
        $stmt = $pdo->prepare('UPDATE progress SET progress_pct = GREATEST(progress_pct, ?), certificate_earned = (GREATEST(progress_pct, ?) >= 100) WHERE user_id = ? AND course_id = ?');
        $stmt->execute([$pct, $pct, $userId, $courseId]);
        json_out(['ok' => true]);
        break;
    default:
        json_out(['error' => 'Unknown action'], 404);
}


