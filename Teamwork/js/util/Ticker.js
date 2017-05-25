import { Request } from '../util/requester';
import { Calculate } from '../calculations';

export class Ticker {

    static cacheIndexes(url, storageUpdatePeriodHours, localStorageName, localStorageDate) {
        const period = storageUpdatePeriodHours * 3600000;
        const now = Date.now();

        if (!localStorage[localStorageDate] || (+localStorage[localStorageDate] < (now - period))) {
            console.log('Im in here, Fetching the tickets again');

            let tickersIndexes = [];

            return Request.get(url)
                .then((data) => {
                    console.log(data);

                    for (let ticker in data) {
                        tickersIndexes.push(ticker);
                    }

                    localStorage[localStorageName] = JSON.stringify(tickersIndexes);
                    localStorage[localStorageDate] = Date.now();
                });
        } else {
            // console.log('else...');
            return Promise.resolve(localStorage[localStorageName]);
        }
    }

    static getKrakenData(baseUrl, pairsArray) {

        let lastTradeClose,
            ticker = {},
            arrayToString = pairsArray.join(','),
            url = baseUrl;

        url += arrayToString;

        return Request.get(url)
            .then((data) => {
                // console.log(data);

                for (let index in data.result) {
                    let indexName = index.slice(1, 4) + index.slice(5);
                    lastTradeClose = +data.result[index].c[0];

                    ticker[indexName] = { indexName, lastTradeClose };
                }
                return ticker;
            });

    }

}