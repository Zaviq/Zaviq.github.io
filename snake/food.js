import { onSnake, expandSnake } from "./snake.js"

import { randomGridPosition } from "./grid.js"
import { scorePoints } from "./scoring.js"


let food

setFirstFoodPosition()

const EXPANSION_RATE = 1
let scoreSound = new sound('mixkit-attention-bell-ding-586.wav')
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

export function update(){
    if(onSnake(food)){
        scoreSound.stop();
        scoreSound.play();
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
        scorePoints()
    }
}

export function draw(gameBoard){
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
    foodElement.innerHTML = '<svg viewBox="0 0 24 24" > <circle cx="12" cy="12" r="10" /> <circle cx="12" cy="12" r="6" /> <circle cx="12" cy="12" r="1" /></svg>'
}

export function getRandomFoodPosition(){
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

export function setFirstFoodPosition(){
    food = getRandomFoodPosition()
}