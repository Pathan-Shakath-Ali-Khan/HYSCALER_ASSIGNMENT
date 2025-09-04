
use hylearn_db;

CREATE TABLE users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  provider VARCHAR(32) NOT NULL DEFAULT 'local',
  role VARCHAR(16) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL
);


CREATE TABLE courses (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(80),
  thumb_text VARCHAR(16),
  video_url TEXT,
  created_at TIMESTAMP NOT NULL
);


CREATE TABLE IF NOT EXISTS course_resources (
  id VARCHAR(64) PRIMARY KEY,
  course_id VARCHAR(64) NOT NULL,
  type ENUM('pdf','ppt','slideshow') NOT NULL,
  name VARCHAR(200) NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);


CREATE TABLE IF NOT EXISTS quiz_questions (
  id VARCHAR(64) PRIMARY KEY,
  course_id VARCHAR(64) NOT NULL,
  question TEXT NOT NULL,
  options_json TEXT NOT NULL,
  correct_index INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);


CREATE TABLE IF NOT EXISTS enrollments (
  user_id VARCHAR(64) NOT NULL,
  course_id VARCHAR(64) NOT NULL,
  enrolled_at TIMESTAMP NOT NULL,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);


CREATE TABLE IF NOT EXISTS progress (
  user_id VARCHAR(64) NOT NULL,
  course_id VARCHAR(64) NOT NULL,
  progress_pct INT NOT NULL DEFAULT 0,
  seconds_watched INT NOT NULL DEFAULT 0,
  certificate_earned TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);


CREATE TABLE IF NOT EXISTS quiz_scores (
  user_id VARCHAR(64) NOT NULL,
  course_id VARCHAR(64) NOT NULL,
  quiz_id VARCHAR(64) NOT NULL,
  score_pct INT NOT NULL,
  taken_at TIMESTAMP NOT NULL,
  PRIMARY KEY (user_id, course_id, quiz_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);


CREATE TABLE IF NOT EXISTS assignments (
  id VARCHAR(64) PRIMARY KEY,
  course_id VARCHAR(64) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  due_date TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);


CREATE TABLE IF NOT EXISTS assignment_submissions (
  id VARCHAR(64) PRIMARY KEY,
  assignment_id VARCHAR(64) NOT NULL,
  user_id VARCHAR(64) NOT NULL,
  answer_text TEXT,
  attachment_url TEXT,
  submitted_at TIMESTAMP NOT NULL,
  UNIQUE (assignment_id, user_id),
  FOREIGN KEY (assignment_id) REFERENCES assignments(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);