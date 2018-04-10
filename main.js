let counter = 1;
let playerOneScore;
let playerTwoScore;

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const button = document.getElementById('button');
button.addEventListener('click', (e) => {
    //player one
    let playerOne = document.getElementById("player1").value;
    playerRequest(playerOne);

    //player two
    let playerTwo = document.getElementById("player2").value;
    playerRequest(playerTwo);
});

const printWinner = (playerUno, playerDos) => {
    
    let winningPlayer = "";

    if (playerUno > playerDos) {
        winningPlayer += `<div class="panel-heading">`;
        winningPlayer +=    `<h2 class="panel-title"> WINNER </h2>`;
        winningPlayer += `</div>`;
        winningPlayer += `<div class="panel-body">Player 1</div>`;
    } else if (playerUno < playerDos) {
        winningPlayer += `<div class="panel-heading">`;
        winningPlayer +=    `<h2 class="panel-title"> WINNER </h2>`;
        winningPlayer += `</div>`;
        winningPlayer += `<div class="panel-body">Player 2</div>`;
    }
    
    printToDom(winningPlayer, 'winner')
}

const buildDomString = (player) => {
    let domString = "";
    domString += `<div id="${player.profile_name}">`;
    domString +=    `<h2>${player.name}</h2>`;
    domString +=    `<img src="${player.gravatar_url}">`;
    domString +=    `<p>${player.points.total}</p>`;
    domString += `</div>`;
    // let firstPlayer = [];
    // let secondPlayer = [];
    
    if (counter === 1) {
        // firstPlayer = {
        //     points: `${player.points.total}`, 
        //     name: `${player.name}`, 
        //     image: `${player.gravatar_url}`,
        // }
        playerOneScore = `${player.points.total}`;
    } else if (counter === 2) {
        // secondPlayer = {
        //     points: `${player.points.total}`, 
        //     name: `${player.name}`, 
        //     image: `${player.gravatar_url}`,
        // }
        playerTwoScore = `${player.points.total}`;
    }
    printToDom(domString, `player${counter}-card-holder`);
    counter++;

    if (counter === 3) {
        printWinner(playerOneScore, playerTwoScore);
    }

    // let winningDomString = "";

    // if (playerOneScore > playerTwoScore && counter === 2) {

    //     winningDomString += `<h3>The winner is ${player.profile_name}!</h3>`;
    //     printToDom(winningDomString, `winner`);
    // } else if (playerTwoScore > playerOneScore && counter === 2) {

    //     winningDomString += `<h3>The winner is ${player.profile_name}!</h3>`;
    //     printToDom(winningDomString, `winner`);
    // }
}

const playerRequest = (user) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", `https://teamtreehouse.com/${user}.json`);
    myRequest.send();
}

function executeThisCodeIfXHRFails () {
    console.log("something broke")
}

function executeThisCodeAfterFileLoaded () {
    const data = JSON.parse(this.responseText);
    buildDomString(data);
}