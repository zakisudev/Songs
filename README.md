# Songs

This repository contains a song information project.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Songs repository is a collection of songs information that can be used for various purposes such as adding, editing and deleting a song. Songs stats including Total # of songs, artists, albums, genres; # of songs in every genre; # of songs & albums each artist has; and # songs in each album are included as stats on the home page.

## Features

- Add a song
- Edit an added song
- Delete an added song

## Installation

To use the Songs repository, you need to have Git OR Docker installed on your machine.

**_ You can clone the repository using the following command: _**

`git clone https://github.com/zakisudev/Songs`

To Start using the Songs App, you will need to install dependencies first and setup environment variables as listed in the `.env.example` file.

## Usage

### Full Usage Setup: backend

`cd api/ && npm install`

### Full Usage Setup: frontend

`cd client/ && npm install`

### Start dev server

`npm run server` inside the api folder

### Run frontend app

`npm run dev`

### Open your favorite web browser and navigate to:

`http://localhost:5173`

## You can also pull the docker image for backend or apis only from docker.hub

`docker pull zakihd/songs-api` PS: Image size is 390MB

Make sure port 5000 is available and run `docker run -p 5000:5000 -d zakihd/songs-api`

This command maps the docker container to the port 5000 and now you can open your favorite web browser and go to http://localhost:5000 to access the apis.

**_ List of available GET api requests:_**

`/api/songs` will give you all songs available
`/api/stats` will give you stats about the songs available

You should stop the container once finished with the following command

Find the image name zakihd/songs-api and grab the container ID with
`docker ps`

Run the command `docker stop XXXXXXXXXXXX` with the correct container ID for zakihd/songs-api

Check on the browser that the api has stopped working. :)

## Contribution

You are welcome to contribute to this repository, Please create a pull request with the latest updates you have made.

## License

This is repository is under the ISC license.
