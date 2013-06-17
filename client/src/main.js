requirejs.config({
    "baseUrl": "src/",
    paths: {
        'jquery': '../libs/jquery',
        'socket.io': '../libs/socket.io',
        'knockout': '../libs/knockout'
    }
});

requirejs(['knockout', 'view/board'], function(ko, board) {
    ko.applyBindings(board);
});