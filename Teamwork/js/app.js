/*jshint esversion: 6 */
import $ from 'jquery';
import { Calculate } from './calculations';
import { Ichimoku } from './ichimokuAnalytics';
import { Data } from './data'
// import { Navigo } from 'navigo';

// Mock data and input
let timeInitial = 1;
let timeEnd = 99999999999999;
let startYear = 2015;
let startMonth = 1;
let startDay = 1;
let ticket = 'ETH';


// check if this amaunt of days in the future the prediction happend:
let daysAfterPrediction = 5;
let daysBackFromNow = 500;
// To implement this points threshhold for better calculation on strong signals
let pointsTreshhold = 30;


let initialDateUnix = (new Date(startYear, startMonth, startDay).getTime() / 1000).toFixed(0);
let endDateUnix = (Date.now() / 1000).toFixed(0);

$.ajax({
        type: "GET",
        url: `https://poloniex.com/public?command=returnChartData&currencyPair=USDT_${ticket}&start=${initialDateUnix}&end=${endDateUnix}&period=86400`,
    })
    .done((data) => {
        data.reverse();
        let historyDataArr = Calculate.analyseHistoryPredictions(data, daysAfterPrediction, daysBackFromNow, pointsTreshhold);
        let predictions = Calculate.analysePredictionsPrecision(historyDataArr);

        Data.renderData(predictions);

        console.log(predictions);

    })
    .fail(() => {
        console.log('ajax error...');
    });