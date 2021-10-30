import { getInputDirection } from "./input.js"

export let snakeBody = [{x:11, y:11,d:'',hr:0}]

let newSegments = 0
export function resetSnakeBody(){
    snakeBody = [{x:11,y:11,d:'',hr:0}]
}
export function update(){
    const inputDirection = getInputDirection()
    for(let i = snakeBody.length -2; i >=0; i--){
        snakeBody[i+1] = {...snakeBody[i]}
    }
    addSegments()
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
    snakeBody[0].d = inputDirection.d
    snakeBody[0].hr = inputDirection.hr
}

export function draw(gameBoard){
    snakeBody.forEach(segment =>{
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        if(snakeBody[0] === segment) {
            snakeElement.classList.remove('snake')
            snakeElement.classList.add('snakehead')
            gameBoard.appendChild(snakeElement)
            snakeElement.innerHTML = '<svg viewBox="0 0 24 24" ><polygon points="12 22, 22 1, 2 1" /></svg>'
            document.querySelector('.snakehead').style.setProperty('--headrotation', segment.hr)
            return
        }
        
        if(segment.d == 'v'){
            snakeElement.classList.remove('snake-body-h')
            snakeElement.classList.add('snake-body-v')
        }
        if(segment.d == 'h'){
            snakeElement.classList.remove('snake-body-v')
            snakeElement.classList.add('snake-body-h')
        }
        gameBoard.appendChild(snakeElement)
    })
}

export function getSnakeHead(){
    return snakeBody[0]
}

export function expandSnake(amount){
    newSegments += amount
}

export function onSnake(position, {ignoreHead = false } = {}){
    return snakeBody.some((segment, index) =>{
        if(ignoreHead && index === 0) return false
        return equalPosition(segment, position)
    })
}

export function snakeIntersection(){
    return onSnake(snakeBody[0], {ignoreHead: true})
}

function equalPosition(pos1,pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments(){
    for( let i = 0 ; i < newSegments ; i++ ){
        snakeBody.push({...snakeBody[snakeBody.length-1]})
    }
    newSegments = 0
}

