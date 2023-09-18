# CurrencyAPI

## Overall solution consists of 1 docker container
To run the container service:
1. Have docker installed ([Docker install link](https://docs.docker.com/engine/install/)) and runnning 
2. In root folder, run `docker compose up`
3. Solution should now run on http://localhost:3000/

## URLs to use in browser (preferred because results are wrapped in HTML):
### Front page:
http://localhost:3000
Very basic html, briefly describing the API's below.

### List currencies:
http://localhost:3000/listCurrencies
The currencies base rate is USD to the shown currency.

### Convert currency:
http://localhost:3000/convertCurrency?amount=10&fromCode=USD&toCode=EUR
Here you can change the amount to the wished amount, fromCode to from currency code and toCode to the desired currency.

## cURL commands (not perfect, as HTML is returned, but usable):
### Front page:
`curl http://localhost:3000`

### List currencies:
`curl http://localhost:3000/listCurrencies`

### Convert currency:
`curl "http://localhost:3000/convertCurrency?amount=10&fromCode=USD&toCode=EUR"`

## Dev notes:
### Setting up local development environment
1. Make sure you have "npm" installed
2. Navigate to /app/ folder and run `npm install`
3. Run `npm run dev` which builds and package the code to the `dist` folder


### Docker commands
Container can be rebuilt with `docker compose build app`


