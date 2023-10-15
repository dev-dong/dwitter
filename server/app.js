import express from 'express';

const app = express();

// Middleware use
app.use(express.json()); // post request의 body를 읽을 수 있게 해준다.

// tweet sample data
const tweets = [
    {
        id: 1,
        text: '드림코딩에서 강의 들으면 너무 좋으다',
        createdAt: '2021-05-09T04:20:57.000Z',
        name: 'Bob',
        username: 'bob',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
    {
        id: 2,
        text: 'dongho Dwitter TEST',
        createdAt: '2023-10-15T04:20:57.000Z',
        name: 'DongHo',
        username: 'dongho',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    }
];

// 전체 tweets 조회 및 query parameter를 통한 검색
app.get('/tweets', (req, res) => {
    const username = req.query.username;
    // username이 undefined이면 false, 값이 있으면 true
    const result = username ? tweets.filter(tweets => tweets.username === username) : tweets;
    res.status(200).send(result);
});

// id를 통한 tweets 조회
app.get('/tweets/:id', (req, res) => {
    const id = Number(req.params.id);
    const result = tweets.find(tweets => tweets.id === id);
    res.status(200).send(result);
});

// tweets 작성
app.post('/tweets', (req, res) => {
    const newId = getNewId(tweets);
    const body = req.body;
    body.id = newId;
    tweets.push(body);
    res.status(200).redirect('/tweets');
});

// tweets 수정
app.put('/tweets/:id', (req, res) => {
    const id = Number(req.params.id);
    const tweet = tweets.find(tweets => tweets.id === id);
    tweet.text = req.body.text;
    res.status(200).redirect('/tweets');
});

// tweets 삭제
app.delete('/tweets/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = tweets.findIndex(tweets => tweets.id === id);
    console.log(index);
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

app.listen(8080);
