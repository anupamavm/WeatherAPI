# Weather API

The Weather API is a Node.js application that allows users to register and receive weather updates for their locations. It also sends weather emails to registered users every 3 hours with the latest weather data.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Registration](#registration)
  - [Weather Data](#weather-data)
  - [Weather Emails](#weather-emails)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Features
- User registration with email,password, and location
- Fetches and stores weather data from OpenWeather API for each user location in each hour
- Sends weather emails to registered users every 3 hours
- Allows users to access their weather data

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine
- MongoDB database

### Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/your-username/weather-api.git
