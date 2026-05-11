const roomTypes = [
  "Enemigos",
  "Cofre",
  "NPC",
  "Trampa",
  "Puzzle",
  "Vacía"
]

const enemies = [
  "Goblin",
  "Zombie",
  "Esqueleto",
  "Cultista",
  "Araña gigante"
]

const npcs = [
  "Mercader",
  "Prisionero",
  "Herrero",
  "Explorador",
  "Traidor"
]

const traps = [
  "Púas ocultas",
  "Dardos venenosos",
  "Gas tóxico",
  "Runa explosiva"
]

const puzzles = [
  "Runas mágicas",
  "Símbolos antiguos",
  "Palancas",
  "Espejos"
]

const chests = [
  "Cofre básico",
  "Cofre raro",
  "Cofre tesoro raro",
  "Cofre legendario"
]

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateRoom(id, totalRooms) {

  const type =
    id === totalRooms
      ? "Boss"
      : random(roomTypes)

  return {
    id,
    type,
    enemy:
      type === "Enemigos"
        ? random(enemies)
        : null,

    npc:
      type === "NPC"
        ? random(npcs)
        : null,

    trap:
      type === "Trampa"
        ? random(traps)
        : null,

    puzzle:
      type === "Puzzle"
        ? random(puzzles)
        : null,

    chest:
      type === "Cofre"
        ? random(chests)
        : null
  }
}

function generateDungeon() {

  const totalRooms = Math.floor(Math.random() * 6) + 10

  const dungeon = document.getElementById("dungeon")

  dungeon.innerHTML = ""

  for (let i = 1; i <= totalRooms; i++) {

    const room = generateRoom(i, totalRooms)

    const div = document.createElement("div")

    div.className = "room"

    div.innerHTML = `
      <h2>Sala #${room.id}</h2>

      <p><strong>Tipo:</strong> ${room.type}</p>

      ${room.enemy ? `<p><strong>Enemigo:</strong> ${room.enemy}</p>` : ""}

      ${room.npc ? `<p><strong>NPC:</strong> ${room.npc}</p>` : ""}

      ${room.trap ? `<p><strong>Trampa:</strong> ${room.trap}</p>` : ""}

      ${room.puzzle ? `<p><strong>Puzzle:</strong> ${room.puzzle}</p>` : ""}

      ${room.chest ? `<p><strong>Cofre:</strong> ${room.chest}</p>` : ""}

      ${room.type === "Boss"
        ? `<p class="boss">BOSS FINAL</p>`
        : ""
      }
    `

    dungeon.appendChild(div)
  }
}

generateDungeon()
