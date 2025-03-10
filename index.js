const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const logFile = 'error.log';
const dataFile = 'latest_post.json';

/**
 * Logs errors to a file
 * @param {string} message - The error message to log
 */
function logError(message) {
    const errorMessage = `[${new Date().toISOString()}] ERROR: ${message}\n`;
    fs.appendFileSync(logFile, errorMessage, 'utf8');
}

/**
 * Saves the latest post data to a file
 * @param {object} post - The post data containing caption and image URL
 */
function savePostData(post) {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(post, null, 2), 'utf8');
        console.log('Post data saved successfully.');
    } catch (error) {
        logError(`Failed to save post data: ${error.message}`);
    }
}

/**
 * Fetches the latest post's caption and image URL from Instagram
 * @param {string} username - The Instagram username to fetch data from
 * @returns {Promise<object|null>} - The post data or null if an error occurs
 */
async function fetchLatestInstagramPost(username) {
    const url = `https://www.instagram.com/${username}/`;
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        // Wait for page content to load
        await page.waitForSelector('article');
        
        // Extract post data
        const post = await page.evaluate(() => {
            const article = document.querySelector('article');
            if (!article) return null;
            
            const imgElement = article.querySelector('img');
            const imageUrl = imgElement ? imgElement.src : null;
            
            const captionElement = article.querySelector('h1, span');
            const caption = captionElement ? captionElement.innerText : "No caption found";
            
            return { caption, imageUrl };
        });

        await browser.close();
        
        if (post) {
            savePostData(post);
        }
        return post;
    } catch (error) {
        logError(`Error fetching Instagram post: ${error.message}`);
        return null;
    }
}

// Usage example
fetchLatestInstagramPost('bbcnews').then(post => {
    if (post) {
        console.log('Latest Post Caption:', post.caption);
        console.log('Image URL:', post.imageUrl);
    } else {
        console.log('Failed to fetch post.');
    }
});

module.exports = fetchLatestInstagramPost;
