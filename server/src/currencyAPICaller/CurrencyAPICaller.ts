import { json } from "express";
import { Currency } from "../business-models/Currency";
import { getCurrencyAPIMapper } from "../mapper/CurrencyAPIMapper";

type CurrencyAPICaller = {
    url: string,
    apiKey: string,
    getCurrencies(): Promise<Currency[]>;
};

export function getCurrencyAPICaller(): CurrencyAPICaller {
    const currencyAPICaller: CurrencyAPICaller = {
        url: "https://api.currencyapi.com/v3/",
        apiKey: "cur_live_wldJPhNjQ1I2q3dMN1BBBSj7o9oAFp0LMyYzIhIv",
        
        getCurrencies: async function (): Promise<Currency[]> {
            return await getAPICurrencies(this.url, this.apiKey);
        },
    };
    return currencyAPICaller;
};

async function getAPICurrencies(url: string, apiKey: string): Promise<Currency[]> {
    const latestCurrencies = await fetch(url + "latest", {
        mode: 'cors',
        headers: {
            'apikey': apiKey
        }
    })
        .then(response => response.json())
        .catch(error => console.log('Error while fetching:', error));
    
    
    const currencyAPIMapper = getCurrencyAPIMapper();

    const currencyObjects = currencyAPIMapper.latestCurrenciesToCurrency(latestCurrencies.data);
    //console.log(currencyObjects);

    return currencyObjects;
    
    //[{ code: "USD", value: 1.00 }, { code: "DKK", value: 7.21 }];
}
