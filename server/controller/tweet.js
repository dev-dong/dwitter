import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res) {
    const username = req.query.username;

    // username이 undefined이면 false, 값이 있으면 true
    const result = await (username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll());
    res.status(200).json(result);
}

export async function getTweet(req, res, next) {
    const id = Number(req.params.id);
    const result = await tweetRepository.getById(id);

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({message: `Tweet id ${id} not found`});
    }
}

export async function createTweet(req, res, next) {
    const {text, name, username} = req.body;
    const tweet = await tweetRepository.create(text, name, username);
    res.status(201).json(tweet);
}

export async function updateTweet(req, res, next) {
    const id = Number(req.params.id);
    const text = req.body.text;
    const tweet = await tweetRepository.update(id, text);

    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message: `Tweet id ${id} not found`});
    }
}

export async function deleteTweet(req, res, next) {
    const id = Number(req.params.id);
    await tweetRepository.remove(id);
    res.sendStatus(204);
}
