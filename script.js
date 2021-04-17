const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

startScreen.addEventListener("click",start);
gameArea.classList.add("hide");
let keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowRight : false,
    ArrowLeft : false,
}

let player = {
    speed : 10,
    score : 0
}

document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);

function start(){

    player.score=0;
    startScreen.classList.add("hide");
    gameArea.classList.remove("hide");
    gameArea.innerHTML="";
    player.start = true;
    window.requestAnimationFrame(playGame);
    for(let x=0; x<15; x++){
        let line = document.createElement("div");
        line.classList.add("line");
        line.y = x*150;
        line.style.top = (x*150)+'px';
        gameArea.appendChild(line);
    }
    let car = document.createElement("div");
    car.setAttribute("class","car");
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    for(let x=0; x<8; x++){
        let enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y = Math.floor((x+1)*1120)*-1;
        enemy.style.top = (enemy.y)+'px';
        enemy.style.left = Math.floor(Math.random()*36)+'vw';
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        enemy.style.backgroundColor = "#" + ((1<<24)*Math.random() | 0).toString(16);
        gameArea.appendChild(enemy);
    } 
}

function moveLine(){
    let lines = document.querySelectorAll(".line");
    lines.forEach(function(item){
        if(item.y>1500){
            item.y -= 1500;
        }
        item.y += player.speed;
        item.style.top = item.y+'px';
    })
}

function moveEnemy(car){
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach(function(item){
        if(isCollide(car,item)){
            console.log("Hit");
            gameEnd();
        }
        if(item.y>2500){
            item.y = -1120;
            item.style.left = Math.floor(Math.random()*36)+'vw';
        }
        item.y += player.speed;
        item.style.top = item.y+'px';
    })
}

function gameEnd(){
    player.start = false;
    startScreen.classList.remove("hide");
    startScreen.style.lineHeight = 13.33+'vh';
    startScreen.innerHTML = `Game Over ! <br> Your Final Score - ${player.score} <br> Click here to Replay`
    score.innerHTML=`Score`;
}

function playGame(){

    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();
    
    moveLine();
    moveEnemy(car);

    if(player.start){
        if(keys.ArrowUp && player.y > 0){ player.y -= player.speed;}
        if(keys.ArrowDown && player.y < road.height-180){player.y += player.speed;}
        if(keys.ArrowRight && player.x < (road.width-80)){player.x += player.speed;}
        if(keys.ArrowLeft && player.x > 0){player.x-= player.speed;}
        car.style.left = player.x + 'px';
        car.style.top = player.y +'px';

        window.requestAnimationFrame(playGame);
        player.speed = Math.floor(player.score)*0.01+10;
        player.score++;
        score.innerText=`Score - ${player.score}`;
    }
}

function isCollide(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect =  b.getBoundingClientRect();

    return !(
        (aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
    ) 
}

function pressOn(e){
    e.preventDefault();
    keys[e.key] = true;
}

function pressOff(e){
    e.preventDefault();
    keys[e.key]=false;
}