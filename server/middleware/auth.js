import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = {message: 'Authentication Error'};

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    // authHeader가 존재하지 않거나, authHeader가 Bearer로 시작하지 않으면 검증이 불가능하다.
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];
    console.log(`token : ${token}`);
    jwt.verify(
        token,
        'C16&_WxlVo#+3I0a)y>%&}oD>EH9|o3*',
        async (error, decoded) => {
            if (error) {
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await userRepository.findById(decoded.id);
            if (!user) {
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id // req.customData
            req.token = token;
            next();
        }
    );
};
