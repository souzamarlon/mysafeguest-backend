# mysafeguest-backend


<h1 align="center">
    My Safe Guest
</h1>

![](https://img.shields.io/github/package-json/v/souzamarlon/mysafeguest-backend.svg)
![](https://img.shields.io/github/last-commit/souzamarlon/mysafeguest-backend.svg?color=red)
![](https://img.shields.io/github/languages/top/souzamarlon/mysafeguest-backend.svg?color=yellow)
![](https://img.shields.io/github/languages/count/souzamarlon/mysafeguest-backend.svg?color=lightgrey)
![](https://img.shields.io/github/languages/code-size/souzamarlon/mysafeguest-backend.svg)
![](https://img.shields.io/github/repo-size/souzamarlon/mysafeguest-backend.svg?color=blueviolet)
[![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)

<h4 align="center">
This app will help you to manage the schedule guest's visit to your condominium.
</h4>

<p align="center">
  <a href="#rocket-Libraries and Technologies">Libraries and Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/souzamarlon/mysafeguest-mobile">Mobile project</a>&nbsp;&nbsp;&nbsp;
</p>

## :rocket: Libraries and Technologies

Back-end:
- [NodeJS](https://nodejs.org)
- [Axios](https://github.com/axios/axios)
- [Immer](https://github.com/immerjs/immer)
- [date-fns](https://date-fns.org/)
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- [cors](https://github.com/expressjs/cors)
- [dotenv](https://github.com/motdotla/dotenv)
- [express](https://github.com/expressjs/express)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [multer](https://github.com/expressjs/multer)
- [pg](https://github.com/brianc/node-postgres)
- [nodemailer](https://github.com/nodemailer/nodemailer)
- [sequelize](https://github.com/sequelize/sequelize)
- [yup](https://github.com/jquense/yup)
- [sentry](https://sentry.io/)

Back-end:
- [VS Code][vc] with [EditorConfig][vceditconfig] and [ESLint][vceslint]

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.13][yarn] or higher installed on your computer.

You'll also need to setup and run a Postgres, mongoDB and a Redis database and insert the access informations into a .env file, based on a .env.example file that is provided in the backend, front-end folders.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/souzamarlon/mysafeguest-backend

# Go into the repository
$ cd mysafeguest-backend

# Install dependencies for backend:
$ yarn

# Note:
# It is necessary to create the database in postgres and then you can execute yarn sequelize db:migrate.

# Run migrations to your database:
$ yarn sequelize db:migrate

# Run the backend server
# Development environmen:
$ yarn dev

# Production environment:
$ yarn build
$ yarn start
```
---
Created by Marlon da Silva Souza :wave: [LinkedIn!](https://www.linkedin.com/in/marlonssouza/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint


