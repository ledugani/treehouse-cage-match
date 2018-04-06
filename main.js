const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const addButtonEventListener = () => {
    const button = document.getElementById('button');
    const userInput = 
    button.addEventListener('click', startApplication());
};

const buildDomString = (player) => {
    let domString = "";
    for (let i=0; i < player.length; i++) {
        domString += `<div id="${player[i].profile_name}">`;
        domString +=    `<h2>${player[i].name}</h2>`;
        domString +=    `<img src="${player[i].gravatar_url}">`;
        domString +=    `<p>${player[i].points.total}</p>`;
        domString += `</div>`;
    }
    printToDom(domString, 'player-card-holder');
}

const startApplication = (player) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", `https://teamtreehouse.com/${inputPlayerUsername}.json`);
    myRequest.send();
}

function executeThisCodeIfXHRFails () {
    console.log("something broke")
}

function executeThisCodeAfterFileLoaded () {
    const data = JSON.parse(this.responseText);
    buildDomString(data);
}

addButtonEventListener();