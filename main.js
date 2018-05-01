let counter = 1;
let player1;
let player2;
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
    //need to know how to actually access the data
    const player1info = getPlayer1Info();

    //player two
    let playerTwo = document.getElementById("player2").value;
    playerRequest(playerTwo);
    const player2info = getPlayer2Info();
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

    if (counter === 1) {
        playerOneScore = `${player.points.total}`;
    } else if (counter === 2) {
        playerTwoScore = `${player.points.total}`;
    }
    printToDom(domString, `player${counter}-card-holder`);
    counter++;

    if (counter === 3) {
        printWinner(playerOneScore, playerTwoScore);
    }
}

const setPlayer1Info = (player1Array) => {
    player1 = player1Array;
    buildDomString(player1);
};

const getPlayer1Info = () => {
    return player1;
    console.log(player1);
};

const setPlayer2Info = (player2Array) => {
    player2 = player2Array;
    buildDomString(player2);
};

const getPlayer2Info = () => {
    return player2;
};

const playerRequest = (user) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", `https://teamtreehouse.com/${user}.json`);
    myRequest.send();
}

function executeThisCodeIfXHRFails () {
    console.error("something broke");
}

function executeThisCodeAfterFileLoaded () {
    const data = JSON.parse(this.responseText);
    if (counter === 1) {
        setPlayer1Info(data);
    } else if (counter === 2) {
        setPlayer2Info(data);
    }
}