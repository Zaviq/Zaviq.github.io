
const scoreBoard = document.querySelector('[data-points]')

const highScoreBoard = document.querySelector('[data-high-score]')

const allTimeHighScoreBoard = document.querySelector('[data-all-time-high-score]')

export let points

export function resetPoints(){
    points = 0
}

resetPoints()

export const id = 'firt-gamer'

let splitHighScores

let lastHighScore

let allTimeHighScore
    

export function scorePoints(){
    points++
    updatePoints(points)
}

export function updatePoints(point){
    scoreBoard.innerText = "Score: " + point
}

function setScoreCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getScoreCookie(cname) {
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

export function setHighScores(){
    let highScoresToSet = lastHighScore.toString() + "-" + allTimeHighScore.toString()
    setScoreCookie(id, highScoresToSet, 7)
}

export function displayHighScores(){
    getHighScores()
    highScoreBoard.innerText = "Last Score: " + lastHighScore
    allTimeHighScoreBoard.innerText = "High Score: " + allTimeHighScore
}

export function displayLiveHighScores(){
    getLiveHighScores()
    highScoreBoard.innerText = "Last Score: " + lastHighScore
    allTimeHighScoreBoard.innerText = "High Score: " + allTimeHighScore
}

function getHighScores(){
    splitHighScores = getScoreCookie(id).split('-')
    if(splitHighScores[1] == '') allTimeHighScoreBoard.innerText = "All Time High Score: " + 0
    allTimeHighScore = parseInt(splitHighScores[0]) < parseInt(splitHighScores[1]) ? splitHighScores[1] : splitHighScores[0]
    lastHighScore = splitHighScores[0]
}

export function getLiveHighScores(){
    allTimeHighScore = parseInt(splitHighScores[0]) < parseInt(splitHighScores[1]) ? splitHighScores[1] : splitHighScores[0]
    lastHighScore = points
}

