import {update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake.js'

import { outsideGrid } from './grid.js'

import {update as updateFood, draw as drawFood } from './food.js'
import { displayHighScores, setHighScores, updatePoints } from './scoring.js'
import { decreaseSnakeSpeed, increaseSnakeSpeed, snakeSpeed, updateSnakeSpeed, setSpeedCookie } from './settings.js'

const speedDecreaseButton = document.querySelector('[data-decrease-button]')

const speedIncreaseButton = document.querySelector('[data-increase-button]')

let lastRenderTime = 0

let gameOver = false

const gameBoard = document.querySelector('[data-game-board]')

function main(currentTime){
    if(gameOver){
        setHighScores()
        setSpeedCookie('snakeSpeed', snakeSpeed, 7)
        if(confirm('You lost! Press OK to restart.')){
            window.location.reload()
        }
        return
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000
    if(secondsSinceLastRender < 1/snakeSpeed) return
    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

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
