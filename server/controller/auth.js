import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';

const jwtSecretKey = 'C16&_WxlVo#+3I0a)y>%&}oD>EH9|o3*';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req, res) {
    const {username, password, name, email, url} = req.body;
    const found = await userRepository.findByUsername(username);

    if (found) {
        return res.status(409).json({message: `${username} already exists`}); // 이미 가입한 사용자
    }

    const hashed = await bcrypt.hash(password, bcryptSaltRounds); // 비밀번호 암호화
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url
    });
    const token = createJwtToken(userId); // 토큰 생성
    res.status(201).json({token, username});
}

export async function login(req, res) {
    const {username, password} = req.body;
    const user = await userRepository.findByUsername(username);

    if (!user) {
        return res.status(401).json({message: 'Invalid user'});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({message: 'Invalid password'});
    }

    const token = createJwtToken(user.id);
    res.status(200).json({token, username});
}

function createJwtToken(id) {
    return jwt.sign({id}, jwtSecretKey, {expiresIn: jwtExpiresInDays});
}

export async function me(req, res, next) {
    const user = await userRepository.findById(req.userId);
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({token: req.token, username: user.username});
}
