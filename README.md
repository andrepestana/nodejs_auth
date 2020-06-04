# nodejs_auth

## .env sample

Create a .env file on the project root with the content:

```
ENV=dev
FAKE_PERSISTENT_DATA=true
ALLOW_ACCESS_FROM_ANY_ORIGIN=true
ACCESS_TOKEN_SECRET=secret1
ACCESS_TOKEN_EXPIRATION=30s
REFRESH_TOKEN_SECRET=secret2
REFRESH_TOKEN_EXPIRATION=1d
EMAIL_CONFIRMATION_TOKEN_SECRET=secret3
EMAIL_CONFIRMATION_TOKEN_EXPIRATION=7d
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=<your_mailtrap_user>
SMTP_PASS=<your_mailtrap_pass>
SEND_MAIL_ON_SIGNUP=false
APP_URL=http://localhost:8080
```

## Project setup
```
npm install
```
## Run server
```
npm run server
```

## Download and run frontend
<https://github.com/andrepestana/vue_auth>