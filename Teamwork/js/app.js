/*jshint esversion: 6 */
import $ from 'jquery';
import { Calculate } from './calculations';
import { Ichimoku } from './ichimokuAnalytics';
import { getTemplate } from './util/templater';
import { Request } from './util/requester';
import { tickerPoints } from './util/tickerPoints';
import { Coloriser } from './util/coloriser';
import { tablesorter } from 'tablesorter';

const now = Date.now();
const storageUpdatePeriod = 86400000; //24 hours in seconds;


if (+localStorage.tickersFetchDate < (now - storageUpdatePeriod)) {
    console.log('Im in here, Fetching the tickets again');
    $.ajax({
            type: "GET",
            url: "https://poloniex.com/public?command=returnTicker"
        })
        .done((data) => {
            console.log(data);

            for (let ticker in data) {
                tickersIndexes.push(ticker);
            }
            localStorage.tickersStorage = JSON.stringify(tickersIndexes);
            localStorage.tickersFetchDate = Date.now();
        });
}
let tickersIndexes = JSON.parse(localStorage.tickersStorage);
// console.log(tickersIndexes);

// Calculate.tickerPoints(tickersIndexes);
// getTemplate('table')
//     .then((template) => {
//         $('#data').html(template(tickersIndexes));
//     });

// analyseAllTickers(tickersArray)
// Mock data and input
let startYear = 2015;
let startMonth = 1;
let startDay = 1;

// check if this amaunt of days in the future the prediction happend:
let daysAfterPrediction = 5;

let pointsTreshhold = 70; // To implement this points threshhold for better calculation on strong signals

// tickersIndexes = ['USDT_ETH', 'BTC_BCN', 'USDT_REP', 'USDT_ETC'];

// Get data slowly from poloniex.com to avoid being banned:
let i = 0;
let len = tickersIndexes.length;

doStuff(); // to rename this...
let tickersResultArray = [];

function doStuff() {

    if (i < len) {
        tickerPoints(startYear, startMonth, startDay, tickersIndexes[i], daysAfterPrediction, pointsTreshhold)
            .then((data) => {
                //add ticker properties to each ticker
                data.ticker = tickersIndexes[i];
                data.predictionScore = ((data.successPredictions / (data.successPredictions + data.wrongPredictions)) * 100).toFixed(2) + '%';

                if (data.successPredictions) {
                    tickersResultArray.push(data);
                }
            })
            .then(() => {
                i += 1;
                setTimeout(doStuff, 200);
            })
    } else {
        i = 0;
        console.log(tickersResultArray);

        getTemplate('table')
            .then((template) => {
                $('#data').html(template(tickersResultArray));
            })
            .then(() => {
                $("#main-table").tablesorter();
            })
            .then(() => {
                Coloriser.table();
            })
            .then(() => {
                $('.table-body').on('click', (clicked) => {
                    let clickedTarget = clicked.target.parentElement;
                    $('.info').removeClass('info');
                    $(clickedTarget).addClass('info');
                })
            })

    }
}