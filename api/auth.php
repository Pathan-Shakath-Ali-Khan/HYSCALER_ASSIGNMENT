<?php
require __DIR__ . '/db.php';
bootstrap_admin();

$path = $_GET['action'] ?? '';

switch ($path) {
    case 'signup':
        require_method('POST');
        $in = input_json();
        $name = trim($in['name'] ?? '');
        $email = trim($in['email'] ?? '');
        $password = trim($in['password'] ?? '');
        if (!$name || !$email || !$password) json_out(['error' => 'Missing fields'], 400);
        $pdo = db_conn();
        $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        if ($stmt->fetch()) json_out(['error' => 'Email already registered'], 409);
        $id = bin2hex(random_bytes(8));
        $stmt = $pdo->prepare('INSERT INTO users (id, name, email, password_hash, provider, role, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())');
        $stmt->execute([$id, $name, $email, password_hash($password, PASSWORD_DEFAULT), 'local', 'user']);
        $_SESSION['user_id'] = $id;
        json_out(['ok' => true, 'user' => ['id' => $id, 'name' => $name, 'email' => $email, 'role' => 'user']]);
        break;

    case 'login':
        require_method('POST');
        $in = input_json();
        $email = trim($in['email'] ?? '');
        $password = trim($in['password'] ?? '');
        $pdo = db_conn();
        $stmt = $pdo->prepare('SELECT id, name, email, password_hash, role FROM users WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if (!$user) json_out(['error' => 'User not found'], 404);
        if (!password_verify($password, $user['password_hash'])) json_out(['error' => 'Invalid credentials'], 401);
        $_SESSION['user_id'] = $user['id'];
        json_out(['ok' => true, 'user' => ['id' => $user['id'], 'name' => $user['name'], 'email' => $user['email'], 'role' => $user['role']]]);
        break;

    case 'me':
        require_method('GET');
        if (!isset($_SESSION['user_id'])) json_out(['user' => null]);
        $pdo = db_conn();
        $stmt = $pdo->prepare('SELECT id, name, email, role FROM users WHERE id = ? LIMIT 1');
        $stmt->execute([$_SESSION['user_id']]);
        $user = $stmt->fetch();
        json_out(['user' => $user ?: null]);
        break;

    case 'logout':
        require_method('POST');
        session_destroy();
        json_out(['ok' => true]);
        break;

    default:
        json_out(['error' => 'Unknown action'], 404);
}


