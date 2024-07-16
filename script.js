const address = "2804:4d98:24a:3900:dd07:fbef:5c9d:29be";
// const address = "mc.hypixel.net"; // For testing when reloading frequently

const statusText = document.querySelector(".status_text");
const statusIcon = document.querySelector(".status_icon > img");
const players = document.querySelector(".players");
const playersText = document.querySelector(".players_text");
const playersGrid = document.querySelector(".players_grid");

async function main() {
    const response = await fetch("https://api.mcsrvstat.us/3/" + encodeURIComponent(address));
    const data = await response.json();

    console.log(data);

    if (data.online) {
        statusText.textContent = "O servidor está aberto!";
        statusIcon.src = "assets/icons/open-lock.png";
        setPlayerList(data.players);
    } else {
        statusText.textContent = "O servidor está fechado!";
    }
}

function setPlayerList(playerData) {
    players.removeAttribute("hidden");

    if (playerData.online === 0)
        return;

    playersText.textContent = "Jogadores online";
    playersGrid.removeAttribute("hidden");

    for (const p of playerData.list)
        playersGrid.append(generatePlayerEntry(p.name));
}

function generatePlayerEntry(name) {
    const skin = document.createElement("img");
    skin.classList.add("players_skin");
    skin.onerror = () => skin.src = "assets/players/default.png";
    skin.src = `assets/players/${name}.png`;

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("players_name");
    nameDiv.textContent = `${name}`;

    const entry = document.createElement("div");
    entry.classList.add("players_entry", "mcButton");
    entry.append(skin, nameDiv);

    return entry;
}

main();
