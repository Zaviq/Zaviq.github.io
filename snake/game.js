import {update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake.js'

import { outsideGrid } from './grid.js'

import {update as updateFood, draw as drawFood, setFirstFoodPosition } from './food.js'
import { displayHighScores, setHighScores, updatePoints } from './scoring.js'
import { decreaseSnakeSpeed, increaseSnakeSpeed, snakeSpeed, updateSnakeSpeed, setSpeedCookie, resetGame } from './settings.js'

export const speedDecreaseButton = document.querySelector('[data-decrease-button]')

export const speedIncreaseButton = document.querySelector('[data-increase-button]')

let lastRenderTime = 0

export let gameOver = false

const gameBoard = document.querySelector('[data-game-board]')

export function resetParam(){
    lastRenderTime = 0
    gameOver = false
}
export let game , pause = true

function setFirstposition(){
    update()
    draw()
}

setFirstposition()
export function startGame(){
    pause = false
    game = setInterval(main, 1000/snakeSpeed);
}
export function stopGame(id){
    pause = true
    clearInterval(id)
}

function main(){
    if(gameOver){
        if(confirm('You lost! Press OK to restart.')){
            stopGame(game)
            resetGame()
            setFirstFoodPosition()
            setFirstposition()
        } else {
            stopGame(game)
            window.location.reload()
        }
        return
    }

    update()
    draw()
}



function update(){
    updateSnake()
    updateFood() 
    checkDeath()
}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

updatePoints(0)

displayHighScores()

updateSnakeSpeed()

speedDecreaseButton.addEventListener('click', decreaseSnakeSpeed)

speedIncreaseButton.addEventListener('click', increaseSnakeSpeed)
