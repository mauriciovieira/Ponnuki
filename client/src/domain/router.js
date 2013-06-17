define(['socket.io'], function(io) {
    var host = 'http://localhost';
    var socket = io.connect(host);



    var connectedObjects = {};

    var handler = function(data) {
        connectedObjects[data.id] && connectedObjects[data.id].handle(data.content);
    };
    socket.on('broadcast', handler);

    var broadcast = function (data) {
        socket.emit('broadcast', data);
    };

    var connect = function (obj) {
        connectedObjects[obj.id] = obj;

        var send = function(data) {
            broadcast({id: obj.id, content: data});
        };
        var old_handle = obj.handle;
        obj.handle = function(data) {
            try {
                old_handle.call(obj, data);
                send(data);
            }
            catch (err) {

            }
        }
    };

    return {
        connect: connect
    }
});

