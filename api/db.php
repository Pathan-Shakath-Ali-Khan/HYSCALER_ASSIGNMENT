<?php
session_start();

function db_conn() {
    static $pdo = null;
    if ($pdo) return $pdo;
    $cfg = require __DIR__ . '/config.php';
    $dsn = "mysql:host={$cfg['host']};port={$cfg['port']};dbname={$cfg['dbname']};charset={$cfg['charset']}";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    $pdo = new PDO($dsn, $cfg['user'], $cfg['pass'], $options);
    return $pdo;
}

function json_out($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function require_method($method) {
    if ($_SERVER['REQUEST_METHOD'] !== $method) json_out(['error' => 'Method not allowed'], 405);
}

function input_json() {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function bootstrap_admin() {
    $cfg = require __DIR__ . '/config.php';
    $pdo = db_conn();
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$cfg['admin_email']]);
    $exists = $stmt->fetchColumn();
    if (!$exists) {
        $stmt = $pdo->prepare('INSERT INTO users (id, name, email, password_hash, provider, role, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())');
        $stmt->execute([
            bin2hex(random_bytes(8)),
            'Admin',
            $cfg['admin_email'],
            password_hash($cfg['admin_pass'], PASSWORD_DEFAULT),
            'local',
            'admin'
        ]);
    }
}


