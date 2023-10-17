import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res) {
    const username = req.query.username;

    // username이 undefined이면 false, 값이 있으면 true
    const result = await (username ? tweetRepository.getAllByUsername(username) : tweetRepository.getAll());
    console.log(`result: ${result}`);
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
    console.log(`text: ${text}, name: ${name}, username: ${username}`);
    const tweet = await tweetRepository.create(text, name, username);
    res.status(201).json(tweet);
}

export async function updateTweet(req, res, next) {
    const id = Number(req.params.id);
    const text = req.body.text;
    const tweet = await tweetRepository.getById(id);

    if (!tweet) {
        return res.sendStatus(404);
    }

    if (tweet.userId !== req.userId) {
        return res.sendStatus(403);
    }

    const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated);
}

export async function deleteTweet(req, res, next) {
    const id = Number(req.params.id);
    const tweet = await tweetRepository.getById(id);

    if (!tweet) {
        return res.sendStatus(404);
    }

    if (tweet.userId !== req.userId) {
        return res.sendStatus(403);
    }
    await tweetRepository.remove(id);
    res.sendStatus(204);
}
