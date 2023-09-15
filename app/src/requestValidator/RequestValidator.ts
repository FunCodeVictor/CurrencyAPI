type RequestValidator = {
    validateCurrencyCoverterRequest(params: any[]): boolean;
};

export function getValidator(): RequestValidator {
    const requestValidator: RequestValidator = {
        validateCurrencyCoverterRequest: (params: any[]): boolean => {
            for (const param of params) {
                if (typeof param != "string") {
                    return false;
                }
            }

            return true;
        }
    }
    
    return requestValidator;
}