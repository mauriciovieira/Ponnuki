define(['domain/router'], function(router) {
    var id = 0;

    var handle = function (stone) {
        //TODO: add rules object to make validations
        //validate overlapping stones
        this.stones().forEach(function (prev_stone) {
            if (!prev_stone) {
                return;
            }
            if (prev_stone.column === stone.column && prev_stone.line == stone.line){
                //TODO: improve this
                throw ( {message: "Overlapping stones"});
            }
        });

        this.stones.push(stone);
    };

    var obj = {
        id: id,
        handle: handle,
        stones: []
    };

    router.connect(obj);

    return obj;
});