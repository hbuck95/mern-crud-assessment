# MERN CRUD Assessment

# Contents
1. [Overview](https://github.com/hbuck95/mern-crud-assessment#mern-crud-assessment)
2. [Running the Application](https://github.com/hbuck95/mern-crud-assessment#running-the-application)\
2a. [Cloning this Repository](https://github.com/hbuck95/mern-crud-assessment#cloning-this-repository)\
2b. [Installing Docker and docker-compose](https://github.com/hbuck95/mern-crud-assessment#installing-docker-and-docker-compose)\
2c. [Starting the Application](https://github.com/hbuck95/mern-crud-assessment#starting-the-application)

# Running the Application

## Cloning this Repository
To clone down this repository first install git if not already installed by running the following commands:
```
sudo apt update
sudo apt install -y git
```

Next run the following command to make sure git installed correctly:
```
git --version
```

You should see similar output to this:
```
git version 2.17.1
```

Now you can clone this repository by executing the following:
```
git clone https://github.com/hbuck95/mern-crud-assessment
```

## Installing Docker and docker-compose
In order to run this application you must first install docker-compose (and ideally docker) if they are not installed already.

First, install docker by running the following series of commands:
```
sudo apt update
sudo apt install -y docker.io
sudo usermod -aG docker $(whoami)
sudo systemctl enable docker
sudo systemctl start docker
```

After this, exit your terminal with ```exit``` or by closing it manually and reopen it to allow the usermod changes to apply and then reopen it.

Now, install docker-compose:
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Check that Docker and docker-compose have both installed correctly:
```
docker --version
docker-compose --version
```

If they have both installed your output should be similar to:
```
Docker version 18.09.7, build 2d0083d
docker-compose version 1.23.2, build 1110ad01
```

Otherwise, repeat the installation steps as above.

## Starting the Application
Navigate to the root directory of this project if not already done so with:
```
cd mern-crud-assessment
```

Now run the application using docker-compose by executing:
```
sudo docker-compose up -d
```

Allow the command to execute and the output should look like:
![Running Output](https://i.imgur.com/tgWSeAO.png)

The application is now running.

# Using the application

## Creating a New User
New users can be created by sending POST requests to the create user end point, this can be done by installing the CURL tool if not already installed:
```
sudo apt update
sudo apt install -y curl
```

A post request can be sent via CURL as follows, make sure to substitute the placeholders (e.g. "YOUR_EMAIL") with your user information:
```
curl -H "Content-Type: application/json" -d '{"username":"YOUR_USERNAME", "email":"YOUR_EMAIL", "password":"YOUR_PASSWORD", "repeatPassword":"YOUR_PASSWORD"}' -X POST http://localhost:5000/user/register
```
Your server should confirm that your details have been added:
```
{"message":"User details added to DB."}
```

e.g:
```
curl -H "Content-Type: application/json" -d '{"username":"Fred", "email":"fred@fred.com", "password":"password123", "repeatPassword":"password123"}' -X POST http://localhost:5000/user/register
```

This will create a new user with the username 'Fred' and email address of 'fred@fred.com' with the password 'password123' assuming the username or email address don't already belong to an account. If, however, they do belong to an account already the server will reject your request with the following response messages:

  For a taken username: ```{"error":"A user with the supplied username already exists."}```\
  For a taken email: ```{"error":"A user with the supplied email address already exists."}```

## Login with your New User
To login with your newly created user another post request is sent:
```
curl -H "Content-Type: application/json" -d '{"username":"YOUR_USER", "email":"YOUR_EMAIL", "password":"YOUR_PASSWORD"}' -X POST http://localhost:5000/user/login
```

e.g:
```
curl -H "Content-Type: application/json" -d '{"username":"Fred", "email":"fred@fred.com", "password":"password123"}' -X POST http://localhost:5000/user/login
```

If your login was successful the server will respond with a status code of 200 and the following message:
```
{"Message":"You have successfully logged in."}
```

If your login details were incorrect you will be denied access to the account with the following response:
```
{"Error":"The username, email, or password entered does not match a username or password in our records."}
```

