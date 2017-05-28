import $ from 'jquery';
import { Calculate } from '../calculations';
import { Ichimoku } from '../util/ichimokuAnalytics';
import { getTemplate } from '../util/templater';
import { Request } from '../util/requester';
import { tickerPoints } from '../util/tickerPoints';
import { Coloriser } from '../util/coloriser';
//@ts-ignore
import { tablesorter } from 'tablesorter';
import { Data } from '../util/Data';
import { Ticker } from '../util/Ticker';
import { Pair } from '../util/Pair';


export function krakenController() {

    const sellAmmountEuro = 100;

    const pairsArray = ['ETHEUR', 'ETHXBT', 'ETCEUR', 'ETCXBT', 'ETCETH', 'REPEUR', 'REPXBT', 'REPETH', 'XBTEUR', 'ICNXBT', 'ICNETH'];

    Data.getKrakenData("https://api.kraken.com/0/public/Ticker?pair=", pairsArray)
        .then(extractData)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        // .then((data) => { console.log(data); return data; })
        .then(tickerGetEuroPrices)
        .then(tickerAddMathData)
        // .then(addSuggestActions)
        .then(findBiggestDiference)
        .then(suggestAction)
}

function addSuggestActions(data) {
    console.log(data);
}

function suggestAction(data) {
    console.log(data);
=======
        .then((data) => {
            // console.log(data);

>>>>>>> parent of 2304a83... Proggress in analytics calculations.

            let tickersCombinedPrices = tickerAllPrices(data);
            // findDiferences(tickersCombinedPrices);

            console.log(tickersCombinedPrices);


<<<<<<< HEAD
    let exitPairName = data.bestTicker.diference.maxBid.pair.slice(3) + data.bestTicker.diference.minAsk.pair.slice(3);
    // let indexMainName = data.tickers[exitPairName.slice(0, 3)];
    // console.log(indexMainName);
    // console.log(exitPairName);

    let tempIndexPrice = data.tickers[exitPairName.slice(0, 3)].prices[exitPairName].ask;



    stepOne = `Buy ${data.bestTicker.diference.minAsk.pair.slice(0,3)} with ${data.bestTicker.diference.minAsk.pair.slice(3)} at ${data.bestTicker.diference.minAsk.price}`;
    stepTwo = `Sell ${data.bestTicker.diference.maxBid.pair.slice(0,3)} for ${data.bestTicker.diference.maxBid.pair.slice(3)} at ${data.bestTicker.diference.maxBid.price}`;
    stepThree = `Sell ${data.bestTicker.diference.maxBid.pair.slice(3)} for ${data.bestTicker.diference.minAsk.pair.slice(3)} at ${tempIndexPrice}`;
    // stepFour = `Buy ${ticker.diference.minAsk.pair}`;
=======
>>>>>>> parent of 2304a83... Proggress in analytics calculations.
=======
        .then((data) => {
            // console.log(data);


            let tickersCombinedPrices = tickerAllPrices(data);
            // findDiferences(tickersCombinedPrices);

            console.log(tickersCombinedPrices);


>>>>>>> parent of 2304a83... Proggress in analytics calculations.

            // let test = new Ticker('ewrdf');

            // test.minPrice = 55.5234;
            // test.minPricePair = 'qterwt';
            // test.maxPrice = 65;
            // test.maxPricePair = 'rhydfg';
<<<<<<< HEAD

            // console.log(test)

        })

=======

            // console.log(test)

        })

>>>>>>> parent of 2304a83... Proggress in analytics calculations.
=======
        .then((data) => {
            // console.log(data);


            let tickersCombinedPrices = tickerAllPrices(data);
            // findDiferences(tickersCombinedPrices);

            console.log(tickersCombinedPrices);



            // let test = new Ticker('ewrdf');

            // test.minPrice = 55.5234;
            // test.minPricePair = 'qterwt';
            // test.maxPrice = 65;
            // test.maxPricePair = 'rhydfg';

            // console.log(test)

        })

>>>>>>> parent of 2304a83... Proggress in analytics calculations.

}

function tickerAllPrices(pairsArray) {

    let resultArray = [];

    let tickers = {};

    for (let pair of pairsArray) {

        let pricesInEuro = {},
            euroCoeficient = 1,
            pairOutCurency = pair.name.slice(3),
            pairMainCurency = pair.name.slice(0, 3),
            symbol = pairMainCurency + pairOutCurency,
            ticker;

        if (pairOutCurency !== 'EUR') {
            let target = pairsArray.find(i => { return i.name === `${pairOutCurency}EUR` });
            euroCoeficient = target.askPrice;
        }

        pricesInEuro[symbol] = pair.askPrice * euroCoeficient;


        if (resultArray.length > 0) {
            ticker = resultArray.find((ticker) => { return ticker.name === pairMainCurency })
            if (!ticker) {
                ticker = new Ticker(pairMainCurency);
                resultArray.push(ticker);
            }
        } else {
            ticker = new Ticker(pairMainCurency);
            resultArray.push(ticker);
        }
        if (ticker.pricesInEuro) {
            ticker.pricesInEuro[symbol] = pricesInEuro[symbol];
        } else {
            ticker.pricesInEuro = pricesInEuro;
        }
    }

    resultArray.forEach(obj => {
        tickers[obj.name] = obj;
    })
    return tickers;
};

function extractData(data) {


    let resultArray = [],
        indexName,
        askPrice;
    for (let index in data.result) {
        indexName = index.slice(1, 4) + index.slice(5);
        askPrice = +data.result[index].a[0];
        let ticker = new Pair(indexName, askPrice);
        resultArray.push(ticker);
    }
    return resultArray;
}

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