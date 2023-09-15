import express from "express";
import { getCurrencyAPICaller } from "./currencyAPICaller/CurrencyAPICaller";
const app = express();

app.get('/listCurrencies', async (req, res) => {
    //get and show currencies
    const currencyAPICaller = getCurrencyAPICaller();
    
    res.json(await currencyAPICaller.getCurrencies());
});


app.get('/convertCurrency', (req, res) => {
    //calculate currency
    res.send('Victor API');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));