This project automates fetching the latest Instagram post, summarizing its caption using AI, and posting it as a tweet on X.com (formerly Twitter). It uses Puppeteer for web scraping, Hugging Face for summarization, and the Twitter API for posting tweets.

Features

Fetch Latest Instagram Post: Uses Puppeteer to scrape the latest post (caption & image URL) from a given Instagram username.

Summarize Captions: Utilizes Hugging Face's BART model to generate a short, tweet-friendly summary.

Post to X.com (Twitter): Automatically posts the summarized caption along with the image to Twitter.

Error Logging & Automation: Logs errors in a file and supports scheduled execution via cron jobs.


🚀 Installation & Setup

1️⃣ Clone the Repository
2️⃣ Install Dependencies
3️⃣ Set Up Environment Variables
4️⃣ Run the Script
npm index.js

it create a file in json and save caption and image url to it.

Run
node index2.js

it summarize the caption and post it to twitter.



