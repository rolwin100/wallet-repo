# Wallet repo for people with high level standards 😄

First of all thank you for giving me the opportunity to rectify the project. You are awesome. In this Readme file I would like to explain why and how the project is structured. 

# Monorepo approach

First of all this project is built with Turbo monrepo. The reason for this is mono repos are awesome and we can manage multiple projects with a monorepo. Most of the opensource projects are built with a monorepo approach. In this project we have kept the backend and client in the apps folder.

## Dev setup

Install the packages

```sh
npm install
```

## Configure environment for Backend

### Backend env configuration

Create a `.env` file inside apps/backend folder and set environment variables found in the `apps/backend/.env.example` file.

The backend is written with nestjs. The reason for this is nestjs has few cool out of the box features and the scafolding becomes easy. 

### Frontend env configuration

Create a `.env` file inside `apps/web` folder and set environment variables found in the `.env.example` file.


## Run the dev env

```sh
npm start
```


This will start the backend and frontend repo on 8000 and 3000 port.
