import Freecurrencyapi from '@everapi/freecurrencyapi-js';

const freecurrencyapi = new Freecurrencyapi('fca_live_YQoclAbOfR5AFFDyR2vwNtUsGc15ioHoMz3DAflr');

const params = {
    base_currency: 'NIS',
    currencies: 'USD,EUR'
};
freecurrencyapi.latest({
    base_currency: 'USD',
    currencies: 'EUR'
}).then(response => {
    console.log(response);
})
    .catch(error => {
        console.error('An error occurred:', error);
    });