import express from 'express';
import 'express-async-errors';

const router = express.Router();

// tweet sample data
let tweets = [
    {
        id: 1,
        text: '드림코더분들 화이팅!',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'bob',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
    {
        id: 2,
        text: 'dongho Dwitter TEST',
        createdAt: Date.now().toString(),
        name: 'DongHo',
        username: 'dongho',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    }
];

// GET /tweets
// GET /tweets?username=:username
router.get('/', (req, res, next) => {
    const username = req.query.username;

    // username이 undefined이면 false, 값이 있으면 true
    const result = username ? tweets.filter(t => t.username === username) : tweets;
    res.status(200).json(result);
});

// GET /tweets/:id
router.get('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const result = tweets.find(t => t.id === id);

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({message: `Tweet id ${id} not found`});
    }
});

// POST /tweets
router.post('/', (req, res, next) => {
    const {text, name, username} = req.body;
    const tweet = {
        id: getNewId(tweets),
        text,
        createdAt: new Date(),
        name,
        username
    };
    tweets = [tweet, ...tweets];
    res.status(201).json(tweet);
});

// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const text = req.body.text;
    const tweet = tweets.find(tweet => tweet.id === id);

    if (tweet) {
        tweet.text = text;
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message: `Tweet id ${id} not found`});
    }
});

// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const index = tweets.findIndex(tweets => tweets.id === id);
    if (index !== -1) {
        tweets.splice(index, 1);
        res.status(200).redirect('/tweets');
    } else {
        res.status(404).send('해당하는 id가 없습니다.');
    }
});

function getNewId(tweets) {
    if (tweets.length === 0) return 1;
    const lastTweet = tweets[tweets.length - 1];
    return lastTweet.id + 1;
}

export default router;