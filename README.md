# URL Shortener Microservice

This project is a part of APIs and Microservices certification on freeCodeCamp.When you submit a long URL, the application provides a shortened URL.

## Documentation

1. When submitting a long URL you will recive a JSON with the URL and the shortened URL. 
2. When submitting an invalid URL the JSON response will contain { error: 'invalid url'}. 
3. When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.

## Installation

npm install - to install all the dependencies

## Example usage:

1.Submit a long URL:

![image](https://user-images.githubusercontent.com/116081834/208247992-27415ced-d0f9-4d9f-bc42-740db3a6e66a.png)


The JSON response:

![image](https://user-images.githubusercontent.com/116081834/208248049-27e3276b-c7ea-4f3d-ac4a-512b56ce9fde.png)

2.Visiting <i>/api/shorturl/moxD</i> will redirect to https://www.google.com

## Built With

- JavaScript
- Node
- Express
- CSS
- HTML
- Nanoid
- Mongoose
- Mongodb
