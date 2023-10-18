import {db} from "../db/database.js";

export async function findByUsername(username) {
    return db.execute('SELECT * FROM users WHERE username = ?', [username])
        .then(result => result[0][0]);
}

export async function findById(id) {
    return db.execute('SELECT * FROM users WHERE id = ?', [id])
        .then(result => result[0][0]);
}

export async function createUser(user) {
    const {username, password, name, email, url} = user;

    // SQL 쿼리를 작성
    return db.execute('INSERT INTO users (username, password, name, email, url) VALUES  (?, ?, ?, ?, ?)',
        [user.username, user.password, user.name, user.email, user.url]
    ).then(result => result[0].insertId); // result[0]은 쿼리 결과, result[0].insertId는 삽입된 데이터의 id
}
