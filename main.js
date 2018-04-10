let counter = 1;

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

const buildDomString = (player) => {
    let domString = "";
    domString += `<div id="${player.profile_name}">`;
    domString +=    `<h2>${player.name}</h2>`;
    domString +=    `<img src="${player.gravatar_url}">`;
    domString +=    `<p>${player.points.total}</p>`;
    domString += `</div>`;
    console.log(`player${counter}-card-holder`);
    printToDom(domString, `player${counter}-card-holder`);
    counter++;
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
    console.log(data);
}