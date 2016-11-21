# restDomain  (**project under development**)

In the domain name industry EPP (Extensible Provisioning Protocol) is used for the provisioning and management of Internet domain names stored in a shared central repository. The idea behind **resDomain** is to simplify the management of domains name with an easy to use REST API. This API will simplify the creation, renewal, transfering ... of domains name. [Registrar](registrar) is a web application and a REST API client for restDomain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install Node (Node.js v7) and Express:
```
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ npm install express --save
```

mongodb have to be installed in your computer. To install the latest version of mongodb in Ubuntu 14.04 

```
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
$ echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
```
Make sure that mongod is started. to start mongod: 
```
sudo service mongod start
```
### Installing and running the API :

Clone the repository :

```
git clone https://github.com/abdesslem/restDomain
```
Install dependencies
```
cd restDomain
npm install
```
Executing the server :
```
nodejs server.js
```

## Built With

* [Express](http://expressjs.com/) - The web framework used
* [Node](https://nodejs.org) - a JavaScript runtime
* [Mongoose](http://mongoosejs.com) - object modeling for Node.js

## Authors

* **Abdesslem Amri** 

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE - see the [LICENSE](LICENSE) file for details




