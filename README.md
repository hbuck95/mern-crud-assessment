# MERN CRUD Assessment

# Contents
1. [Overview](https://github.com/hbuck95/mern-crud-assessment#mern-crud-assessment)
2. [Running the Application](https://github.com/hbuck95/mern-crud-assessment#running-the-application)\
2a. [Cloning this Repository](https://github.com/hbuck95/mern-crud-assessment#cloning-this-repository)\
2b. [Installing Docker and docker-compose](https://github.com/hbuck95/mern-crud-assessment#installing-docker-and-docker-compose)\
2c. [Starting the Application](https://github.com/hbuck95/mern-crud-assessment#starting-the-application)
3. [Using the Application](https://github.com/hbuck95/mern-crud-assessment#using-the-application)\
3a. [Creating a New User](https://github.com/hbuck95/mern-crud-assessment#creating-a-new-user)\
3b. [Login with your New User](https://github.com/hbuck95/mern-crud-assessment#login-with-your-new-user)\
3c. [Creating Items](https://github.com/hbuck95/mern-crud-assessment#creating-items)\
3d. [Retrieving Items](https://github.com/hbuck95/mern-crud-assessment#retrieving-items)\
3e. [Updating Items](https://github.com/hbuck95/mern-crud-assessment#updating-items)\
3f. [Deleting Items](https://github.com/hbuck95/mern-crud-assessment#deleting-items)
4. [Stop the Application](https://github.com/hbuck95/mern-crud-assessment#stop-the-application)

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
curl -H "Content-Type: application/json" -d '{"username":"YOUR_USERNAME", "email":"YOUR_EMAIL", "password":"YOUR_PASSWORD"}' -X POST http://localhost:5000/user/login
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

## Creating Items
To create an item you must first have a user account, please complete the above two steps before continuing if not done so already.

Items are created by send POST requests to the add endpoint in the item routes table, this is done using CURL as follows:
```
curl -H "Content-Type: application/json" -d '{"username":"YOUR_USERNAME", "email":"YOUR_EMAIL", "password":"YOUR_PASSWORD", "content":"YOUR_CONTENT"}' -X POST http://localhost:5000/item/add
```

e.g:
```
curl -H "Content-Type: application/json" -d '{"username":"Fred", "email":"fred@fred.com", "password":"password123", "content":"Hello world!"}' -X POST http://localhost:5000/item/add
```

If your POST request was successful the server will respond with:
```
{"Message":"Item added to DB."}
```

However, if your username was invalid or the email address/password didn't correspond to the provided username your request will be rejected:
```
{"Error":"The username or password entered does not match a username or password in our records."}
```

## Retrieving Items
To retrieve items POST/GET requests must be sent, this application has 2 implemented methods to retrieve items: getting a single item, and getting every item in the database.

### Get Everything
In order to get everything a request is simply sent to the getAll endpoint:
```
curl http://localhost:5000/item/getAll
```

This will return every item within database (the content and the username of the user who created it) with the exception of the users email address which is kept private, for our purposes we are also returning the id:
```
[{"_id":"5d3af5074103847053d19628","username":"Fred","content":"Hello world!","__v":0}]
```

### Get A Single Item
Unlike retrieving all the items, when getting a single item the request is a POST-type rather than GET. This is because data must be sent to the server, this could be done via parameters in a GET request however we are sending them in the requests body which is not a networking standard for GET requests.

In order to get an item we have to provide the items id, in our getAll example above we retrieve the item we created earlier which had an id of: *5d3af5074103847053d19628*

Our POST request to get this item will be:
```
curl -H "Content-Type: application/json" -d '{"_id":"YOUR_ID"}' -X POST http://localhost:5000/item/get
```

e.g:
```
curl -H "Content-Type: application/json" -d '{"_id":"5d3acfc2c62d152617dd8a97"}' -X POST http://localhost:5000/item/get
```

The server will respond with your item, for our example item that looks like:
```
[{"_id":"5d3af5074103847053d19628","username":"Fred","content":"Hello world!","__v":0}]
```

If the provided item id doesn't match a stored item the response will instead be:
```
{"Message":"There are no items with that id"}
```

## Updating Items
When updating items we also need the id of the item we're updating, this can be accessed by running the getAll request as show above. 

To update an item a PUT request must be sent with the username, email address, and password of the user who created it:
```
curl -H "Content-Type: application/json" -d '{"_id":"YOUR_ID", "username":"YOUR_USERNAME", "email":"YOUR_EMAIL", "password":"YOUR_PASSWORD", "content":"YOUR_CONTENT"}' -X PUT http://localhost:5000/item/update
```

e.g:
```
curl -H "Content-Type: application/json" -d '{"_id":"5d3af5074103847053d19628", "username":"Fred", "email":"fred@fred.com", "password":"password123", "content":"Goodbye world!"}' -X PUT http://localhost:5000/item/update
```

If successful, the server will respond:
```
{"Message":"Item successfully updated."}
```

If your provided credentials were incorrect the server will instead respond:
```
{"Error":"The username, email, or password entered does not match a set in our records."}
```

If the id provided was incorrect the server will also respond:
```
{"Error":"An item with the supplied ID could not be found."}
```

To check that your post updated successfully you can run the getAll request and you should see your new record content:

Run the request:
  ```
  curl localhost:5000/item/getAll
  ```
Output:
  ```
  [{"_id":"5d3af5074103847053d19628","username":"Fred","content":"Goodbye world!","__v":0}]
  ```

## Deleting Items
To delete your item your id will be required again.

Items are deleted as follows:
```
curl -H "Content-Type: application/json" -d '{"_id":"YOUR_ID", "email":"YOUR_EMAIL", "password":"YOUR_PASSWORD"}' -X DELETE http://localhost:5000/item/delete
```

e.g:
```
curl -H "Content-Type: application/json" -d '{"_id":"5d3af5074103847053d19628", "email":"fred@fred.com", "password":"password123"}' -X DELETE http://localhost:5000/item/delete
```

If successful you will receive the following response from the server:
```
{"Message":"Item removed from DB."}
```

If your credentials are incorrect the server will instead respond:
```
{"Error":"The username, email, or password entered does not match a set in our records."}
```

Or, if the id entered didn't match a record:
```
{"Error":"Couldn't find an item with the provided ID."}
```

# Stop the Application
Once you are done using the application it can be stopped by running a docker command which will automatically bring down all the services started earlier.

Run the following command:
```
docker-compose down
```

After several seconds a series of messages should print to the terminal showing the containers being stopped, it should look like this:\
![Stopping the Application](https://i.imgur.com/7TG6tMV.png)

The application is now stopped.
