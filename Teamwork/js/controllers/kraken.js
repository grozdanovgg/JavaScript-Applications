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
            // console.log(ticker);

            let tickersCombinedPrices = tickerAllPrices(tickers);
            console.log(tickersCombinedPrices);




        })

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

    // let priceInETH;
    // let priceInXBT;

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