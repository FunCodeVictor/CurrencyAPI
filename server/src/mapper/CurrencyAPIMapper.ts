import { Currency } from "../business-models/Currency";

type CurrencyAPIMapper = {
    latestCurrenciesToCurrency(data: any): Currency[]
};

export function getCurrencyAPIMapper(): CurrencyAPIMapper {
    const currencyAPICaller: CurrencyAPIMapper = {

        latestCurrenciesToCurrency: (data: any): Currency[] => {
            const currencies: Currency[] = [];
                        
            for (const t in data) {
                currencies.push({
                    code: data[t].code,
                    value: data[t].value
                })
            }
            
            return currencies;
        }
    };
    return currencyAPICaller;
}
