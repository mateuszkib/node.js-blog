# Node.js blog

Application build in React, Node.js and MongoDB. 

## Installation

Run ```npm install``` in server and client folder 

## Usage

Create config/config.env in server folder and add below configuration
```
PORT=3000
NODE_ENV=development
SITE_URL=http://localhost:3000
SITE_NAME=Node.js blog
SALT=

DB_URL=

SECRET_KEY_TOKEN=secret
SECRET_KEY_JWT_PASSPORT=secret

MAX_UPLOAD_FILE_SIZE=100000
PATH_TO_UPLOAD_ARTICLES_IMAGE=./public/uploads/articles/
PATH_TO_UPLOAD_USERS_IMAGE=./public/uploads/users/

MAILTRAP_USERNAME=
MAILTRAP_PASSWORD=
MAILTRAP_EMAIL_FROM=
```

## Run App
```
cd ./server
npm run dev
```

