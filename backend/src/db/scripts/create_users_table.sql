USE casino_db;
-- Users table to store user information (optional, for authentication)
CREATE TABLE users
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    credits    INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
