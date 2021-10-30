import { resetParam, speedDecreaseButton, speedIncreaseButton } from "./game.js"
import { resetInputDirection } from "./input.js"
import { setHighScores } from "./scoring.js"
import { resetSnakeBody } from './snake.js'


export function resetGame(){
    resetParam()
    resetInputDirection()
    resetSnakeBody()
    setHighScores()
    setSpeedCookie('snakeSpeed', snakeSpeed, 7)
}

export let snakeSpeed = getSpeedCookie('snakeSpeed')=="" ? 5 : parseInt(getSpeedCookie('snakeSpeed'))

export let GRID_SIZE = 40
document.querySelector('[data-game-board]').style.setProperty('--gridsize', GRID_SIZE)
const snakeSpeedIndicator = document.querySelector('[data-snake-speed]')

export function updateSnakeSpeed(){
    snakeSpeedIndicator.innerText = snakeSpeed
}

export function increaseSnakeSpeed(){
    if(snakeSpeed >= 50) return
    snakeSpeed++
    updateSnakeSpeed()
    speedIncreaseButton.blur()
}

export function decreaseSnakeSpeed(){
    if(snakeSpeed <= 1) return
    snakeSpeed--
    updateSnakeSpeed()
    speedDecreaseButton.blur()
}



export function setSpeedCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



function getSpeedCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}