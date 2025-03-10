This project automates fetching the latest Instagram post, summarizing its caption using AI, and posting it as a tweet on X.com (formerly Twitter). It uses Puppeteer for web scraping, Hugging Face for summarization, and the Twitter API for posting tweets.

Features

Fetch Latest Instagram Post: Uses Puppeteer to scrape the latest post (caption & image URL) from a given Instagram username.

Summarize Captions: Utilizes Hugging Face's BART model to generate a short, tweet-friendly summary.

Post to X.com (Twitter): Automatically posts the summarized caption along with the image to Twitter.

Error Logging & Automation: Logs errors in a file and supports scheduled execution via cron jobs.


🚀 Installation & Setup

1️⃣ Clone the Repository
2️⃣ Install Dependencies using npm install
3️⃣ Set Up Environment Variables all value in .env file
4️⃣ Run the Script
npm index.js

it create a file in json and save caption and image url to it from latest post.

Run
node index2.js

it summarize the caption and post it to twitter.


Test case:
when run index.js it get:

{
  "caption": "A shorter winter and increased hot weather has wreaked havoc for many farmers and business owners across India.\n\nFor 50 years, Nitin Goel’s family clothing business in Ludhiana has made jackets, sweaters and sweatshirts. \n\nBut, erratic weather and the early onset of summer has meant sales have plummeted and his whole business model has had to change. \n\n“Big retailers haven’t picked up goods despite confirmed orders,” he said. \n\nThe heat in India does not seem to be ending soon.\n\nAbove-normal maximum temperatures and heatwaves are likely to persist over most parts of the country between March and May, the weather agency has warned.\n\nTap the link in @BBCNews’s bio to read how India’s much-loved Alphonso mango orchards have been impacted. \n\n#BBCNews",
  "imageUrl": "https://instagram.flko1-1.fna.fbcdn.net/v/t51.2885-15/483613813_18499636030022727_5052188368695895383_n.jpg?stp=dst-jpg_e15_p640x640_tt6&_nc_ht=instagram.flko1-1.fna.fbcdn.net&_nc_cat=103&_nc_oc=Q6cZ2AHUlsfzlUcmBinOUcmi7FYFJijdJZarAF66DMrbVoThDn00MFbtOLMAVewFS38DAnhXJMnAHDpqcmrGhxZNd5D7&_nc_ohc=tRTsYQ4qFq8Q7kNvgFolsWI&_nc_gid=238ec52f7d5b4983be6909f1f1d3f737&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYHsQkqfIOP2vpFmU3v1hyHuZ_daaqox0M_cpEhTWQhgxw&oe=67D4CB98&_nc_sid=8b3546"
}

using summarize:

we get:

Tweet Summary: A shorter winter and increased hot weather has wreaked havoc for many farmers and business owners across India. For 50 years, Nitin Goel’s family clothing business in Ludhiana 
has made jackets, sweaters and sweatshirts. But erratic weather and the early onset of summer has meant sales have plummeted and his whole business model has had to change.


and it get posted to twitter.


Wanted to change instagram url just go to index.js file and update username :
fetchLatestInstagramPost('bbcnews').then(post => {
    if (post) {
        console.log('Latest Post Caption:', post.caption);
        console.log('Image URL:', post.imageUrl);
    } else {
        console.log('Failed to fetch post.');
    }
});

change username according to need.



