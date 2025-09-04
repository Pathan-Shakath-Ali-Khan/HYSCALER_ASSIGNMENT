HYLEARN - PHP + MySQL backend setup

1) Create database
   - In MySQL: CREATE DATABASE hylearn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

2) Configure credentials
   - Edit api/config.php and set host, dbname, user, pass

3) Create tables
   - Import schema.sql into your database using your MySQL client

4) Run with PHP server (example)
   - From project root: php -S 127.0.0.1:8000
   - Ensure PHP can route to /api/*.php endpoints

5) Admin account
   - On first API call, admin is auto-created using credentials in api/config.php
   - Default: admin@hylearn.com / admin123


