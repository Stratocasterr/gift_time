CREATE DATABASE santa;
CREATE TABLE santa_users(
    id SERIAL PRIMARY KEY,
    user_data JSON,
    user_presents JSON,
    user_messages JSON
);
