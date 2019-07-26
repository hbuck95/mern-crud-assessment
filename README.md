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

## Starting the application
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




