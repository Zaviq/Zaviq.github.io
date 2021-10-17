
// let vMin = 0

// const gameBoard = document.querySelector('[data-game-board]')

// function getVmin() {

//     let viewPortWidth
//     let viewPortHeight
   
//     // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
//     if (typeof window.innerWidth != 'undefined') {
//       viewPortWidth = window.innerWidth
//       viewPortHeight = window.innerHeight - 50
//     }

//     vMin = viewPortWidth < viewPortHeight ? viewPortWidth : viewPortHeight
// }

// function setDimensions(){
//     getVmin()
//     gameBoard.style.width = vMin + "px"
//     gameBoard.style.height = vMin + "px"
// }

// setDimensions()

// window.addEventListener('resize', setDimensions)
function removeFirstChild(){
    const firstChild = document.querySelectorAll('div')[0]
    firstChild.innerHTML = ""
    document.body.removeChild(firstChild)
}

setTimeout(removeFirstChild, 1500);
