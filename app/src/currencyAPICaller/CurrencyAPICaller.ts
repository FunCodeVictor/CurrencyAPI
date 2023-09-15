import { json } from "express";
import { Currency } from "../business-models/Currency";
import { getCurrencyAPIMapper } from "../mapper/CurrencyAPIMapper";

type CurrencyAPICaller = {
    url: string,
    apiKey: string,
    getCurrencies(): Promise<Currency[]>;
    convertCurrency(amount: string, fromCode: string, toCode: string): Promise<string>;
};

export function getCurrencyAPICaller(): CurrencyAPICaller {
    const currencyAPICaller: CurrencyAPICaller = {
        url: "https://api.currencyapi.com/v3/",
        apiKey: "cur_live_wldJPhNjQ1I2q3dMN1BBBSj7o9oAFp0LMyYzIhIv",
        getCurrencies: async function(): Promise<Currency[]> {
            return await getAPICurrencies(this.url, this.apiKey, "USD");
        },
        convertCurrency: async function (amount: string, fromCode: string, toCode: string): Promise<string> {
            const currencies = await getAPICurrencies(this.url, this.apiKey, fromCode, toCode);
            return convertAmountWithToCodeRate(amount, toCode, currencies);
        }
    };
    return currencyAPICaller;
};

function convertAmountWithToCodeRate(amount: string, toCode: string, currencies: Currency[]): string {
    let relevantCurrency = null;
    for (const tempCurrency of currencies) {
        if (tempCurrency.code == toCode) {
            relevantCurrency = tempCurrency;
            break;
        }
    }

    if (relevantCurrency == null) {
        console.log("Error, wished conversion code is not found");
        return "0";
    }

    return (+amount * relevantCurrency.value).toFixed(2);
}

async function getAPICurrencies(url: string, apiKey: string, baseCurrency: string, currency?: string): Promise<Currency[]> {
    let currencyParameter = "";
    if (currency) {
        currencyParameter = "&currencies=" + currency;
    }
    
    const fetchUrl = url + "latest" +
        "?apikey=" + apiKey +
        "&base_currency=" + baseCurrency +
        currencyParameter;

    console.log(fetchUrl);
    const latestCurrencies = await fetch(fetchUrl, {
        mode: 'cors',
        headers: {
            'apikey': apiKey
        }
    })
        .then(response => response.json())
        .catch(error => console.log('Error while fetching:', error));

    const currencyAPIMapper = getCurrencyAPIMapper();

    const currencyObjects = currencyAPIMapper.latestCurrenciesToCurrency(latestCurrencies.data);

    return currencyObjects
}
