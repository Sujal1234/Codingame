/**
 * Grab the pellets as fast as you can!
 **/
class Pellet{
    constructor(x,y,value){
        this.x = x;
        this.y=y;
        this.value=value;
    }
}
class Pac{
    constructor(x, y, id){
        this.x = x;
        this.y = y;
        this.id = id;

        this.targetX=x;
        this.targetY=y;
    }

    findClosestPellet(pellets){
        var nearest=Infinity;
        for(var i=0;i < pellets.length;i++){
            var pellet=pellets[i];
            var d=dist(this.x, this.y, pellet.x, pellet.y);

            if(d < nearest){
                nearest=d;
                this.targetX=pellet.x;
                this.targetY=pellet.y;
            }
        }
    }

}

function dist(x1, y1, x2, y2){
    //manhattan distance
    return Math.abs(x1-x2) + Math.abs(y1-y2);
}


var inputs = readline().split(' ');
const width = parseInt(inputs[0]); // size of the grid
const height = parseInt(inputs[1]); // top left corner is (x=0, y=0)
for (let i = 0; i < height; i++) {
    const row = readline(); // one line of the grid: space " " is floor, pound "#" is wall
}
var myPacs=[];
var Pellets=[];

// game loop
turn = 0;
while (true) {
    Pellets=[];
    var inputs = readline().split(' ');
    const myScore = parseInt(inputs[0]);
    const opponentScore = parseInt(inputs[1]);
    const visiblePacCount = parseInt(readline()); // all your pacs and enemy pacs in sight
    

    for (let i = 0; i < visiblePacCount; i++) {
        var inputs = readline().split(' ');
        const pacId = parseInt(inputs[0]); // pac number (unique within a team)
        const mine = inputs[1] !== '0'; // true if this pac is yours
        const x = parseInt(inputs[2]); // position in the grid
        const y = parseInt(inputs[3]); // position in the grid
        const typeId = inputs[4]; // unused in wood leagues
        const speedTurnsLeft = parseInt(inputs[5]); // unused in wood leagues
        const abilityCooldown = parseInt(inputs[6]); // unused in wood leagues

        if(mine){
            if(turn===0){
                myPacs.push(new Pac(x,y,pacId));
            }else{
                var pac = myPacs.find(element => element.id==pacId);
                pac.x = x;
                pac.y = y;
            }
        }
    }
    const visiblePelletCount = parseInt(readline()); // all pellets in sight

    for (let i = 0; i < visiblePelletCount; i++) {

        var inputs = readline().split(' ');
        const x = parseInt(inputs[0]);
        const y = parseInt(inputs[1]);
        const value = parseInt(inputs[2]); // amount of points this pellet is worth

   
        Pellets.push(new Pellet(x,y,value));

    }

    for(var pac of myPacs){
        pac.findClosestPellet(Pellets);
    }


    // Write an action using console.log()
    // To debug: console.error('Debug messages...');
 
    for(var pac of myPacs){
        console.log('MOVE'+' '+pac.id+' '+pac.targetX+' '+pac.targetY);
    }
    turn++;
}
