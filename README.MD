

# Table of Contents
* [Introduction](#Introduction)
* [Technologies](#technologies)
* [Dependancies](#dependancies)
* [Dev Dependancies](#dev-dependancies)
* [Setup](#setup)
* [Usage](#usage)



# Introduction

Fetch Titles is an example application to show case the different approaches that can be used to control the flow of async operations in Node.js. This application simply handles one request in four different ways. So basically there are four routes for one purpose that is fetch titles of the provided web addresses but each request maps to a different approach.

The approaches for control flow used are as follow:

* callbacks
* control flow library async.js
* Native Promises (Could have used bluebird, RSVP or Q but wanted to use native promises)
* Reactive Programming using RxJS

# Technologies

* NodeJS (v 10.9.0)
* ExpressJS

# Dependancies

* express
* request
* request-promise-native
* async
* cheerio
* pug
* rxjs

# Dev Dependancies

* nodemon


# Setup

Clone this repo and run the following command to install dependancies
``` 
npm i
``` 

Then using the following command to run the development server

```
npm run dev
```

# Usage

Using following four types of requests and passing web addresses as query param `address` would return titles of those websites with four different approaches. Each request is four each approach.

1) Callbacks
   ```
   /callbacks/I/want/title?address=google.com&address=npmjs.com
   ```

2) Using a control flow library `async.js`
   ```
   /async-lib/I/want/title?address=google.com&address=npmjs.com
   ```

3) Using Native Promises 
   ```
   /promises/I/want/title?address=google.com&address=npmjs.com
   ```

4) Using Reactive Programming Library `RxJS`
   ```
   /rxjs/I/want/title?address=google.com&address=npmjs.com
   ```
