import $ from 'jquery';

export class Coloriser {

    static table() {
        //Colorise table according to Prediction score
        $('.prediction-score').each((i, value) => {
            const predictionScore = $(value);
            let contentRaw = predictionScore.html().trim();
            let points = +contentRaw.substring(0, contentRaw.length - 1);

            if (points > 50) {
                predictionScore.parent().addClass('list-group-item-success');
            } else {
                predictionScore.parent().addClass('list-group-item-danger');
            }
        })
    }
}