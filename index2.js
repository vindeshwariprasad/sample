const fs = require('fs');
const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();
const fetch = require('node-fetch');
const LATEST_POST_FILE = 'latest_post.json';



// Initialize Twitter client
const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_APP_KEY,
    appSecret: process.env.TWITTER_APP_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET
});

/**
 * Summarizes an Instagram caption using OpenAI
 * @param {string} caption - The full Instagram caption
 * @returns {Promise<string>} - The summarized tweet
 */
async function summarizeCaption(caption) {
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: caption })
        });

        const data = await response.json();
        if (data && data[0] && data[0].summary_text) {
            return data[0].summary_text.trim();
        } else {
            console.error('Error: Hugging Face API did not return a valid response.');
            return null;
        }
    } catch (error) {
        console.error('Error summarizing caption:', error);
        return null;
    }
}

/**
 * Posts a tweet to X.com (Twitter)
 * @param {string} tweet - The tweet text
 * @returns {Promise<void>}
 */
async function postTweet(tweet) {
    try {
        const response = await twitterClient.v2.tweet(tweet);
        console.log('Tweet posted successfully:', response.data);
    } catch (error) {
        console.error('Error posting tweet:', error);
    }
}

/**
 * Main function to process Instagram post and tweet summary
 */
async function processAndTweet() {
    try {
        // Read the latest post file
        if (!fs.existsSync(LATEST_POST_FILE)) {
            console.error('Error: latest_post.json file not found.');
            return;
        }
        const postData = JSON.parse(fs.readFileSync(LATEST_POST_FILE, 'utf8'));
        const { caption, imageUrl } = postData;
        
        // Summarize the caption
        const tweetText = await summarizeCaption(caption);
        if (!tweetText) {
            console.error('Error: Failed to generate tweet text.');
            return;
        }
        console.log('Tweet Summary:', tweetText);
        // Post tweet
        await postTweet(`${tweetText} \n📸 ${imageUrl}`);
    } catch (error) {
        console.error('Error processing Instagram post:', error);
    }
}

// Run the process
processAndTweet();

module.exports = { summarizeCaption, postTweet, processAndTweet };
