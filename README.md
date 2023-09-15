# Weather API

The Weather API is a Node.js application that allows users to register and receive weather updates for their locations. It also sends weather emails to registered users every 3 hours with the latest weather data.

## Table of Contents

- [Features](#features)
<!-- - [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Registration](#registration)
  - [Weather Data](#weather-data)
  - [Weather Emails](#weather-emails)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license) -->

## Features

- User registration with email,password, and location
- Fetches and stores weather data from OpenWeather API for each user location in each hour
- Sends weather emails to registered users every 3 hours
- Allows users to access their weather data

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB database

### Test this application using the below Postman API Collection
<div class="postman-run-button"
data-postman-action="collection/fork"
data-postman-visibility="public"
data-postman-var-1="26602017-3f44dbd5-410e-483a-bb2d-c1396aadcdf6"
data-postman-collection-url="entityId=26602017-3f44dbd5-410e-483a-bb2d-c1396aadcdf6&entityType=collection&workspaceId=a6bf912e-170f-48f6-a82e-fecc94998211"></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>

