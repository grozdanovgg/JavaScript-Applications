import * as data from 'data';
<<<<<<< HEAD
import { load as loadTemplate } from 'templates';
=======
>>>>>>> origin/master

const $appContainer = $('#app-container');

export function homeController() {

<<<<<<< HEAD
    Promise.all([
        //извиквам двата промиса, чиито резултат обработваме директно с desctructuring assignment
        loadTemplate('home'),
        data.getCookies()
    ]).then(([template, cookies]) => {

        // тук вече визуализираме, тъй като имаме темплейта:

        console.log(template);
        console.log(cookies);
        // console.log(cookies);
        // console.log($appContainer.html());

        $appContainer.html(template(cookies));
        // $appContainer.html('test');
    })
=======
    data.getCookies()
        .then(cookies => {
            console.log(cookies);
            $appContainer.html('Showing cookies');
        });
>>>>>>> origin/master
}