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
            let templateData;

            pairsArray.forEach((name) => {
                for (let obj of data) {
                    console.log(obj);
                }
            })

            console.log(data);



            return templateData
        }).then((templateData) => {

            getTemplate('kraken')
                .then((template) => {
                    $('#data').html(template(templateData));
                })
                .then(() => {
                    $("#main-table").tablesorter();
                })
                .then(() => {
                    $('.table-body').on('click', (clicked) => {
                        let clickedTarget = clicked.target.parentElement;
                        $('.info').removeClass('info');
                        $(clickedTarget).addClass('info');
                    })
                })
        })






}