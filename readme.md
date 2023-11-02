# Alderazzi Backend Api

Api for webpage and mudlet (mud client) using by one of https://arkadia.rpg.pl guild.

Dual language API.

<br>

## Alderazzi Frontend Resources

**Github:** https://github.com/airfortech/alderazzi-frontend

**Live test server:** https://ra-test.airm.ct8.pl/

**Password for all roles:**

    test1234

<br>

## Tech Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)


<br>

## Additional Main Packages

mongoose
https://www.npmjs.com/package/mongoose

bcrypt.js https://www.npmjs.com/package/bcryptjs

cookie-parser https://www.npmjs.com/package/cookie-parser

jsonwebtoken https://www.npmjs.com/package/jsonwebtoken

node-cron https://www.npmjs.com/package/node-cron

lorem-ipsum https://www.npmjs.com/package/lorem-ipsum

dayjs
https://www.npmjs.com/package/dayjs

express-async-errors
https://www.npmjs.com/package/express-async-errors

<br>

## Project Structure

    .
    ├── app.ts
    ├── backups
    ├── config
    ├── controllers
    │   ├── auth
    │   ├── backups
    │   ├── enemies
    │   ├── keyGiverDrops
    │   ├── keyGivers
    │   ├── keys
    │   ├── locations
    │   ├── privileges
    │   ├── settings
    │   └── users
    ├── data
    ├── db
    │   ├── models
    │   ├── mongoose.ts
    │   ├── tools
    │   │   ├── backupDb
    │   │   ├── createDb
    │   │   ├── createInitialSettings.ts
    │   │   ├── getSettings.ts
    │   │   └── saveEnemiesToFile.ts
    │   └── validators
    ├── routes
    ├── tests
    ├── todo.txt
    ├── types
    │   └── translations
    └── utils

<br>

## Install Packages

    npm install

<br>

## Configure Project

`npm run db:create-db` creates fake data for testing

`npm run db:create-users` creates roles and set passwords

`npm run start:watch` development mode

<br>

## Tools

`npm run testing:deploy` deploys app to test server

`testing:reset-database` resets testing database. Database resets one time per week on test server

`testing:create-users` creates roles and passwords. Passwords are set to default one time per week.

<br>

## API Endpoints

Endpoints in `*.http` files in `./tests` folder