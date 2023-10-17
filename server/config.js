import dotenv from 'dotenv';

dotenv.config(); // .env 파일을 읽어서 process.env에 넣어준다.

// 만약 정의되지 않은 환경변수를 사용한다면? 값이 있는지 없는지 실시간으로 확인해서 서버를 시작하자 마자 알려준다.
function required(key, defaultValue = undefined) {
    // process.env[key]가 없으면 defaultValue를 사용한다. defaultValue가 있으면 덮어씌운다.
    const value = process.env[key] || defaultValue;
    if (value == null) { // null or undefined
        throw new Error(`Key ${key} is undefined`);
    }
    return value;
}

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
    },
    host: {
        port: parseInt(required('HOST_PORT', 8080))
    },
    db: {
        host: required('DB_HOST'),
        user: required('DB_USER'),
        database: required('DB_DATABASE'),
        password: required('DB_PASSWORD'),
    }
}