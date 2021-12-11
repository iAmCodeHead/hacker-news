
## Description

This is a little [Nest](https://github.com/nestjs/nest) application for fetching and wrangling data from the [HackerNewsApi](https://github.com/HackerNews/API).

## Installation
Ensure you have [Node.js](https://nodejs.org/en/download/) installed. This installation comes with [npm](https://www.npmjs.com/) (node package manager for installing and managing node packages). With this in place:
* Clone the repo (git clone https://github.com/iAmCodeHead/hacker-news.git) from your terminal.
* CD into the root directory of your clone.
* Run the command below from your terminal.

```bash
$ npm install
```
If you wish to do more with Nest, you can get started with the official documentation [here](https://docs.nestjs.com/) and install the ```nest cli``` globally using the command below.

```bash
$ npm i -g @nestjs/cli
```

## Running the app
In the root directory of your app, create a ```.env``` file and add the following keys
```bash
PORT=4400

NODE_ENV=development

HACKER_NEWS_URL=https://hacker-news.firebaseio.com/v0
```

After installing all dependencies with ```npm install```, you can now start the app with the command below.

```bash
# development
$ npm run start

# watch mode (preferably to automatically reload on change)
$ npm run start:dev
```

## Test
You can run the test suits with the command below.
```bash
# unit tests
$ npm run test --detectOpenHandles

```
## Stay in touch

If you've got further questions, please shoot me an email at akandesamson12@gmail.com
