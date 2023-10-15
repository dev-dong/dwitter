export default class TweetService {
    constructor(http) {
        this.http = http;
    }

    async getTweets(username) {
        const query = username ? `?username=${username}` : '';
        return this.http.fetch(`/tweets${query}`, {
            method: 'GET',
        });
    }

    async postTweet(text) {
        return this.http.fetch(`/tweets`, {
            method: 'POST',
            body: JSON.stringify({text, username: 'dongho', name: 'DongHo'}),
        });
    }

    async deleteTweet(tweetId) {
        return this.http.fetch(`/tweets${tweetId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
    }

    async updateTweet(tweetId, text) {
        return this.http.fetch(`/tweets/${tweetId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text}),
        });
    }
}
