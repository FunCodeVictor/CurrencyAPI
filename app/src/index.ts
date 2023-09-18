import express from "express";
import { getCurrencyAPICaller } from "./currencyAPICaller/CurrencyAPICaller";
import { getValidator } from "./requestValidator/RequestValidator";
const app = express();
const currencyAPICaller = getCurrencyAPICaller();
const validator = getValidator();


app.get('/', async (req, res) => {
    
    res.send(
        ' <h1> Welcome to the currency API! </h1> \
          <h2> The following API\'s can be freely used </> \
          <h3> \'\/listCurrencies\' is a GET request, which returns the current currency codes with their conversion value, based off the USD. The return format is JSON. </> \
          <h3> \'\/convertCurrency\' is a GET request which takes three parameters, \'amount\', \'fromCode\' and \'toCode\'. It returns the converted amount. The return format is JSON. </> \
        '
        );
});


app.get('/listCurrencies', async (req, res) => {
    const currencies = await currencyAPICaller.getCurrencies();

    res.json(currencies);

    /* text return
    var readableCurrencies = currencies.map(cur => {
        return '<p>' + cur.code + "=" + cur.value + '</>';
    });

    res.send(readableCurrencies.join(''));
    */
});


app.get('/convertCurrency', async (req, res) => {
    //calculate currency
    const amount = req.query.amount;
    const fromCode = req.query.fromCode;
    const toCode = req.query.toCode;

    if (!validator.validateCurrencyCoverterRequest([amount, fromCode, toCode])) {
        res.send("Request not validated OK");
        return;
    }

    const resultAmount = await currencyAPICaller.convertCurrency(<string> amount, <string> fromCode, <string> toCode);
    
    res.json({result: resultAmount, code: toCode});
    /* text return
    res.send('<p>' + amount + " " + fromCode + " is converted to:" + '\n' + resultAmount + " " + toCode + '\n' + '</>');
    */
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));