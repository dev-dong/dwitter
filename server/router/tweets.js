// import 순서는 외부, 내부 순서로 하면 된다.
import express from 'express';
import 'express-async-errors';
import {body} from 'express-validator';
import * as tweetController from '../controller/tweet.js';
import {validate} from '../middleware/validator.js';

// validation
// sanitization
const router = express.Router();

const validateTweet = [
    body('text').trim().isLength({min: 3}).withMessage('text should be at least 3 characters'),
    validate
];

// GET /tweets
// GET /tweets?username=:username
// 함수를 호출하는게 아니라 함수를 연결해줘야한다.
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweet);

// POST /tweets
router.post('/', validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
