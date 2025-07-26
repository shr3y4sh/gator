# Gator : A CLI RSS feed aggregator.

### _Shreyash Srivastava_

## Overview

-   This is a CLI app made with typescript, node.js and postgresql for the guided project for bootdev.com course.

-   It can be used to fetch your desired RSS feeds from across the internet

-   You can save your preffered feed by simply following one of the existing feeds or add your own

## Commands

1. [register](#register)
2. [login](#login)
3. [users](#users)
4. [feeds](#feeds)
5. [addfeed](#addfeed)
6. [follow](#follow)
7. [following](#following)
8. [unfollow](#unfollow)
9. [agg](#aggregate)
10. [browse](#browse)

### Register

`npm start register <username>`

To start browsing the feeds you need to register with just a username.

### Login

`npm start login <username>`

Login with your registered username to get your feeds

### Users

`npm start users`

Get the list of users currently registered

### Feeds

`npm start feeds`

Get the list of available feeds in the repository

### AddFeed

`npm start addfeed <title> <url>`

Add a new feed to the repository, with your identity as the owner of the feed and add it to your follows list

### Follow

`npm start follow <url>`

Follow any of the feed from the repository

### Following

`npm start following`

Get the list of Feed titles you are following

### Unfollow

`npm start unfollow <url>`

Remove a particular feed from your follows list

### Aggregate

`npm start agg <time>`

Start the aggregator loop which will fetch and save posts from the saved feeds starting from the earliest fetched feed. If a post already exists in the repo, it will skip over and fetch the next feed.

Time should be written in the format: [Number]ms/s/m/h

ms -> millisecond(s), s -> second(s), m -> minute(s), h -> hour(s)

-   Example:

    `npm start agg 2s`

    fetches feeds every 2 seconds

### Browse

`npm start browse [limit]`

Browse the list of posts in your followed feed in the order of latest published date.

-   **limit** -> number of posts to limit in the current request

    (default is 2, if no limit provided)
