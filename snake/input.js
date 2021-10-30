import { stopGame, game, pause, startGame } from "./game.js"

let inputDirection
resetInputDirection()

let lastInputDirection = {x:0,y:0}
export function resetInputDirection(){
    inputDirection = {x:0, y:0}
}
window.addEventListener('keydown', e =>{
    switch(e.key){
        case 'ArrowUp':
            if(pause) {startGame()}
            if(lastInputDirection.y !== 0) break
            inputDirection = {x:0,y:-1,d:'v',hr:180}
            break
        case 'ArrowDown':
            if(pause) {startGame()}
            if(lastInputDirection.y !== 0) break
            inputDirection = {x:0,y:1,d:'v',hr:0}
            break
        case 'ArrowRight':
            if(pause) {startGame()}
            if(lastInputDirection.x !== 0) break
            inputDirection = {x:1,y:0,d:'h',hr:270}
            break
        case 'ArrowLeft':
            if(pause) {startGame()}
            if(lastInputDirection.x !== 0) break
            inputDirection = {x:-1,y:0,d:'h',hr:90}
            break
        case ' ':
            if(!pause){
            stopGame(game)
            }else{return}
            break
    }
})

const gameControlButtons = document.querySelector('[data-mobile-control-buttons]')

gameControlButtons.addEventListener('click', e =>{
    switch(e.path[0].innerText){
        case '↑':
            if(lastInputDirection.y !== 0) break
            inputDirection = {x:0,y:-1}
            break
        case '↓':
            if(lastInputDirection.y !== 0) break
            inputDirection = {x:0,y:1}
            break
        case '→':
            if(lastInputDirection.x !== 0) break
            inputDirection = {x:1,y:0}
            break
        case '←':
            if(lastInputDirection.x !== 0) break
            inputDirection = {x:-1,y:0}
            break
    }
})

export function getInputDirection(){
    lastInputDirection = inputDirection
    return inputDirection
}
