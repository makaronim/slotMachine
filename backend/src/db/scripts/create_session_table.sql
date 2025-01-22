USE casino_db;
-- Sessions table to store game session data
CREATE TABLE sessions
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    credits    INT                       DEFAULT 10,
    status     ENUM ('active', 'closed') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users (id),
    created_at TIMESTAMP                 DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP                 DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
