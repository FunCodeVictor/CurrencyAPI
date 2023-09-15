# CurrencyAPI

## Overall solution consists of 1 docker container
To run the container service:
1. Have docker installed ([Docker install link](https://docs.docker.com/engine/install/)) and runnning 
2. In root folder, run `docker compose up`
3. Solution should now run on http://localhost:3000/

## URLs to use:
### List currencies:
http://localhost:3000/listCurrencies
The currencies base rate is USD to the shown currency.

### Convert currency:
http://localhost:3000/convertCurrency?amount=10&fromCode=USD&toCode=EUR
Here you can change the amount to the wished amount, fromCode to from currency code and toCode to the desired currency.

## Dev notes:
Container can be rebuilt with `docker compose build server`

