import * as userRepository from './auth.js';

// userRepository 참고한다.
let tweets = [
    {
        id: 1,
        text: '드림코더분들 화이팅!',
        createdAt: new Date().toString(),
        userId: '1'
    }
];

// 그냥 return을 해도 async 키워드가 붙으면 promise 형태로 변환된다.
export async function getAll() {
    return Promise.all(
        tweets.map(async tweet => {
            const {username, name, url} = await userRepository.findById(tweet.userId);
            console.log({...tweet});
            return {...tweet, username, name, url};
        })
    );
}

export async function getAllByUsername(username) {
    return getAll().then(tweets => tweets.filter(tweet => tweet.username === username));
}

export async function getById(id) {
    const found = tweets.find(tweet => tweet.id === id);
    if (!found) {
        console.log(`Tweet id ${id} not found`);
        return null;
    }
    const {username, name, url} = await userRepository.findById(found.userId);
    return {...found, username, name, url};
}

export async function create(text, userId) {
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        userId
    };
    tweets = [tweet, ...tweets];
    return getById(tweet.id);
}

export async function update(id, text) {
    const tweet = tweets.find(tweet => tweet.id === id);
    if (tweet) {
        tweet.text = text;
    }
    return getById(tweet.id);
}

export async function remove(id) {
    tweets = tweets.filter(tweet => tweet.id != id);
    return tweets;
}
