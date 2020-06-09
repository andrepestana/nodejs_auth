# nodejs_auth

## About
Api to authenticate and authorize users with NodeJS. 

So far we have the features:
- signup
- signin
- persistent session in the browser
- user email confirmation
- change password
- list all sessions for the current user
- logout from sessions in other devices
- recover lost password through email with link to change password

TODO: 
- create user roles
- create page for only admin user to see all user "sessions" and manage them
- create a user page they can update and is visible for other users
- logs in files
- unit tests
- implement persistence in DB
- logon through facebook and google authentication

## Project setup  
### .env sample

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
RETRIEVE_PASSWORD_TOKEN_SECRET=secret4
RETRIEVE_PASSWORD_TOKEN_EXPIRATION=2d
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=<your_mailtrap_user>
SMTP_PASS=<your_mailtrap_pass>
SEND_MAIL_ON_SIGNUP=false
APP_URL=http://localhost:8080
```

### Download dependencies
```
npm install
```
### Run server
```
npm run server
```

### Download and run frontend
<https://github.com/andrepestana/vue_auth>


## Project deploy
### Create docker image
```
sudo docker build -t nodejs_auth .
```

### Run docker image
```
sudo docker run --env-file=.env  -p 3000:3000 -d nodejs_auth
```

### List containers
```
sudo docker container ls -a
```

### Check stdout/stderr from running container
```
sudo docker logs <container id>
```

### Stop container
```
sudo docker container stop <container id>
```

### System prune
```
sudo docker system prune
```