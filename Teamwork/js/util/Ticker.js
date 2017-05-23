import { Request } from '../util/requester';
import { Calculate } from '../calculations';

export class Ticker {

    static cacheIndexes(storageUpdatePeriodHours) {
        const period = storageUpdatePeriodHours * 3600000;
        const now = Date.now();

        if (!localStorage.tickersFetchDate || (+localStorage.tickersFetchDate < (now - period))) {
            console.log('Im in here, Fetching the tickets again');

            let tickersIndexes = [];

            return Request.get("https://poloniex.com/public?command=returnTicker")
                .then((data) => {
                    // console.log(data);

                    for (let ticker in data) {
                        tickersIndexes.push(ticker);
                    }
                    localStorage.tickersStorage = JSON.stringify(tickersIndexes);
                    localStorage.tickersFetchDate = Date.now();
                });
        } else {
            // console.log('else...');
            return Promise.resolve(localStorage.tickersStorage);
        }
    }

    // static fetchData(storageUpdatePeriodHours, tickersIndexes, tickersResult, startYear, startMonth, startDay, daysAfterPrediction, pointsTreshhold) {
    //     const period = storageUpdatePeriodHours * 3600000;
    //     const now = Date.now();

    //     return Calculate.getTableData(tickersIndexes, startYear, startMonth, startDay, daysAfterPrediction, pointsTreshhold)
    //         .then((tickersResult) => {
    //             return tickersResult;
    //         })

    // }
}