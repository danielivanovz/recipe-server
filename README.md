<h1 align="center">recipe server</h1>

<h5 align="center">A NodeJS, Express and MongoDB REST API to deliver recipes scraped with <a href="https://github.com/heyiamZer0/web-scrapper">Recipe Scraper</a></h5>

<div align="center">

  <a href="https://codeclimate.com/github/heyiamZer0/recipe-server/maintainability"><img src="https://api.codeclimate.com/v1/badges/f68d495d710408cbdc6b/maintainability" /></a>
</div>
<br>

## Installation

Run the following script in your terminal, it will create a folder containing the script and install dependencies.


```sh
git clone --depth=50 --branch=main https://github.com/heyiamZer0/recipe-server.git heyiamZer0/recipe-server recipe-scraper && cd recipe-scraper && yarn
```
create your .env file:

```sh
vim .env
```
press `i` to start insert mode and define your enviroment variables:

* URI = `mongodb+srv://databaseMongo:PASSWORD@cluster0.mongodb.net/DATABASE?retryWrites=true&w=majority`
* PORT = `<#PORT to run the server at>`
* DB_NAME = `MONGO_DATABASE_NAME`
* DB_COLLECTION = `MONGO_DATABASE_COLLECTION`

to exit and save, hit `esc` and `:wq`

## Start the server


```sh
yarn devTS
```

## Usage

Example for `GET` /id with ID `1234` on the local database using the recipes scraped with [Recipe Scraper][recipe-scraper] will return:

[recipe-scraper]:https://github.com/heyiamZer0/recipe-scraper 

```typescript
{ 
    _id: 1234
    title: String
    image: String
    ingredients: [{
        ingredient: String
        quantity: String
    }]
    description: [{
        step: Number
        instructions: String
    }]
    calories: null || Number
    category: String
    difficulty: String
    time: Number
}
```

## Built With
* [NodeJS][nodejs] - runtime environment
* [Express][express] - framework
* [MongoDB][mongodb] - mongodb native driver
* [TypeScript 4.0][typescript] - codebase
* [Pino][pino] - logging

[nodejs]:https://github.com/nodejs/node
[express]:https://github.com/expressjs/express
[mongodb]:https://github.com/mongodb/node-mongodb-native
[typescript]:https://github.com/microsoft/TypeScript
[pino]:https://github.com/pinojs/pino

## Related projects

- [Recipe Scraper][recipe-scraper]
- [Recipe React App][react-app]

[recipe-scraper]: https://github.com/heyiamZer0/recipe-scraper
[react-app]: https://github.com/heyiamZer0/recipier-react

## License

Distributed under the MIT License. See `LICENSE` for more information.

