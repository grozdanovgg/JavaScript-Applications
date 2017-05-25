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
    const cacheTime = 1 / 360; //10secs

    const sellAmmountEuro = 100;

    const pairsArray = ['ETHEUR', 'ETHXBT', 'ETCXBT', 'ETCETH', 'REPXBT', 'REPETH', 'XBTEUR'];
    Ticker.getKrakenData("https://api.kraken.com/0/public/Ticker?pair=", pairsArray)
        .then((data) => {
            console.log(data);

            // console.log(localStorage.krakenETHdata);
            // return JSON.parse(localStorage.krakenETHdata);
        })
        // .then((tickersIndexes) => {
        //     //TO SEPARATE GETDABLE DATA AND RENDER THE TABLE:
        //     Calculate.getTableData(tickersIndexes, year, month, day, daysAfterPrediction, pointsTreshhold);
        //     // .then((tickersResult) => {
        //     //     console.log(tickersResult);
        //     //     return tickersResult;
        //     // })
        // })




    // let data = Request.get("https://api.kraken.com/0/public/Ticker?pair=ETHEUR")
    //     .then((data) => {
    //         // Check if data cached


    //         if (!localStorage.tempData || localStorage.krakenLastUpdate < (Date.now() - period)) {

    //             console.log('object');
    //             localStorage.tempData = JSON.stringify(data);
    //         } else {
    //             console.log('not here');
    //         }


    //         // let localData = JSON.parse(localStorage.tempData);

    //         // console.log(JSON.parse(localStorage.tempData));
    //         // console.log(data);
    //     })

    // .catch((error) => {
    //     console.log('Error fetching the data from Kraken API:');
    //     console.log(error);
    // })






}