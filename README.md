# CurrencyAPI

To run the service:
1 install and run docker
2 in root folder, run `docker compose up`

Solution should now run on localhost:3000

URLs to use:
List currencies:
http://localhost:3000/listCurrencies
The currencies base rate is USD to the shown currency.

Convert currency:
http://localhost:3000/convertCurrency?amount=10&fromCode=USD&toCode=EUR
Here you can change the amount to the wished amount, fromCode to from currency code and toCode to the desired currency.

Dev notes:
Container can be rebuilt with `docker compose build server`

