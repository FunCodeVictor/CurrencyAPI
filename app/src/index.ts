import express from "express";
import { getCurrencyAPICaller } from "./currencyAPICaller/CurrencyAPICaller";
import { getValidator } from "./requestValidator/RequestValidator";
const app = express();
const currencyAPICaller = getCurrencyAPICaller();
const validator = getValidator();



app.get('/listCurrencies', async (req, res) => {
    const currencies = await currencyAPICaller.getCurrencies();
    
    var readableCurrencies = currencies.map(cur => {
        return cur.code + "=" + cur.value;
    });

    res.send(readableCurrencies.join("\n"));
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
    
    res.send(amount + " " + fromCode + " is converted to:" + '\n' + resultAmount + " " + toCode);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));