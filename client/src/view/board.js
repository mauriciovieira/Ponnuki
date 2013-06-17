define(['binders/board','domain/board'], function (ko, board) {
    var diameter = 600/19;
    var radius = diameter/2;

    var stones = ko.observableArray();
    board.stones = stones;

    var clearBoard = function (ctx) {
        ctx.clearRect(0, 0, 600, 600);
    };

    var drawStones = function(ctx) {
        function drawStone(stone) {
            stone.x = stone.x || radius + stone.column*diameter + Math.floor((Math.random()*5))-2;
            stone.y = stone.y || radius + stone.line*diameter + Math.floor((Math.random()*5))-2;

            var x = stone.x;
            var y = stone.y;

            var grd = ctx.createRadialGradient(x-5,y-7,0,x-7,y-10,10);
            if (stone.color === 'black') {
                grd.addColorStop(0, '#BBBBBB');
                grd.addColorStop(1, '#001d10');
            }
            else {
                grd.addColorStop(0, '#ffffff');
                grd.addColorStop(1, '#dadad0');
            }

            ctx.fillStyle = grd;

            ctx.beginPath();
            ctx.arc(x, y, radius-2, 0, 2*Math.PI, true);
            ctx.closePath();

            ctx.shadowColor = '#444';
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 1.5;
            ctx.shadowOffsetY = 2;

            ctx.fill();
        }

        if (stones().length) {
            stones().forEach(function(stone){
                drawStone(stone);
            });
        }
    };

    var boardClick = function(data, event) {
        var findClosestPoint = function(coordinates) {
            var column, line;
            for (var x = 0; x < 19; x++) {
                var point = radius + x*diameter;
                if (point-radius < coordinates.x && coordinates.x < point+radius) {
                    column = x;
                }
                if (point-radius < coordinates.y && coordinates.y < point+radius) {
                    line = x;
                }
            }
            return {column: column, line: line}
        };

        var stone = findClosestPoint({x: event.layerX, y:event.layerY});

        var lastStone = stones()[stones().length - 1] || {color: 'white'};


        stone.color = (lastStone.color === 'white') ? 'black' : 'white';

        try {
            board.handle(stone);
            //stones.push(stone);
        }
        catch (err) {
            alert(err.message);
        }
    };

    return {
        stones: stones,
        clearBoard: clearBoard,
        drawStones: drawStones,
        boardClick: boardClick
    };
});