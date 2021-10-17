

export let snakeSpeed = 5


const snakeSpeedIndicator = document.querySelector('[data-snake-speed]')

export function updateSnakeSpeed(){
    snakeSpeedIndicator.innerText = snakeSpeed
}

export function increaseSnakeSpeed(){
    if(snakeSpeed >= 10) return
    snakeSpeed++
    updateSnakeSpeed()
}

export function decreaseSnakeSpeed(){
    if(snakeSpeed <= 1) return
    snakeSpeed--
    updateSnakeSpeed()
}