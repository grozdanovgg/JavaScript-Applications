import { MyRouter } from 'myRouter';
import { homeController } from 'homeController';
<<<<<<< HEAD
import { userController } from 'userController';
=======
>>>>>>> origin/master
const router = new MyRouter();

router
    .on('/', location.hash = '#/home')
    .on('/home', homeController())
<<<<<<< HEAD
    .on('/my-cookie', myCookieController())
    .on('/auth', userController())
    .on('logout', )
=======
>>>>>>> origin/master
    // .on('/home/:category', someController)
    // .on('/my-cookie', someController);


$(window).on('load', () => router.navigate())
$(window).on('haschchange', () => router.navigate())