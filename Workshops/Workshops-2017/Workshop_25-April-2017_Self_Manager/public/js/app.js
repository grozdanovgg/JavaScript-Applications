// Using Navigo
var root = null;
var useHash = false; // Defaults to: false
var hash = '#'; // Defaults to: '#'
var router = new Navigo();

router
    .on('/home', function() {
        console.log('test OK');
        // display all the products
    })
    .on('/todos', toDos())
    .on('/events', events())
    .resolve();