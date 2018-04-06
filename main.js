const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
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