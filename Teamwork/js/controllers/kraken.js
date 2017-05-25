import $ from 'jquery';
import { Calculate } from '../calculations';
import { Ichimoku } from '../util/ichimokuAnalytics';
import { getTemplate } from '../util/templater';
import { Request } from '../util/requester';
import { tickerPoints } from '../util/tickerPoints';
import { Coloriser } from '../util/coloriser';
import { tablesorter } from 'tablesorter';
import { Ticker } from '../util/Ticker';

export function krakenController() {

    const sellAmmountEuro = 100;

    const pairsArray = ['ETHEUR', 'ETHXBT', 'ETCEUR', 'ETCXBT', 'ETCETH', 'REPEUR', 'REPXBT', 'REPETH', 'XBTEUR'];

    Ticker.getKrakenData("https://api.kraken.com/0/public/Ticker?pair=", pairsArray)
        .then((tickers) => {

            let tickersCombinedPrices = tickerAllPrices(tickers);

            let diferences = findDiferences(tickersCombinedPrices);

            console.log(tickersCombinedPrices);
            console.log(diferences);
        })

    function findDiferences(tickersCombinedPrices) {
        let combinedTicker;
        for (let i in tickersCombinedPrices) {
            let min = Number.MAX_SAFE_INTEGER,
                max = Number.MIN_SAFE_INTEGER,
                diference;
            combinedTicker = tickersCombinedPrices[i];

            for (let j in combinedTicker.pricesInEuro) {
                let pairPrice = combinedTicker.pricesInEuro[j];
                if (pairPrice < min) {
                    min = pairPrice;
                }
                if (pairPrice > max) {
                    max = pairPrice;
                }

                diference = max - min;
                combinedTicker.diference = diference;
                combinedTicker.diferencePercentage = ((max / min) - 1) * 100;
            }
        }
        return tickersCombinedPrices;
    }

    // .then((templateData) => {

    //     getTemplate('kraken')
    //         .then((template) => {
    //             $('#data').html(template(templateData));
    //         })
    //         .then(() => {
    //             $("#main-table").tablesorter();
    //         })
    //         .then(() => {
    //             $('.table-body').on('click', (clicked) => {
    //                 let clickedTarget = clicked.target.parentElement;
    //                 $('.info').removeClass('info');
    //                 $(clickedTarget).addClass('info');
    //             })
    //         })
    // })

}

function tickerAllPrices(tickersObj) {
    let tickersCombinedPrices = {};

    for (let i in tickersObj) {
        let pricesInEuro = {};
        let euroCoeficient = 1;
        let ticker = tickersObj[i];
        let cacheOutCurency = ticker.indexName.slice(3);
        let mainCurency = ticker.indexName.slice(0, 3);
        let symbol = mainCurency + cacheOutCurency;

        if (cacheOutCurency !== 'EUR') {
            euroCoeficient = tickersObj[cacheOutCurency + 'EUR'].lastTradeClose;
        }

        pricesInEuro[symbol] = ticker.lastTradeClose * euroCoeficient;
        if (tickersCombinedPrices[mainCurency]) {
            tickersCombinedPrices[mainCurency].pricesInEuro[symbol] = pricesInEuro[symbol];
        } else {
            tickersCombinedPrices[mainCurency] = {
                pricesInEuro
            };
        }

    }
    return tickersCombinedPrices;
};