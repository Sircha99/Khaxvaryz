const roomTypes = [
  "Enemigos",
  "Cofre",
  "NPC",
  "Puzzle",
  "Trampa",
  "Vacía"
]

function random(arr){
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateDungeon(){

  const dungeon = document.getElementById("dungeon")

  dungeon.innerHTML = ""

  const map = document.createElement("div")

  map.style.position = "relative"
  map.style.width = "1400px"
  map.style.height = "900px"
  map.style.margin = "auto"

  const rooms = []

  let x = 650
  let y = 80

  const totalRooms = 15

  for(let i = 0; i < totalRooms; i++){

    const room = {
      id: i + 1,
      x,
      y,
      type: i === totalRooms - 1
        ? "Boss"
        : random(roomTypes)
    }

    rooms.push(room)

    const direction = Math.floor(Math.random() * 3)

    if(direction === 0){
      x += 180
    }

    if(direction === 1){
      x -= 180
    }

    y += 120
  }

  rooms.forEach((room,index)=>{

    if(index > 0){

      const prev = rooms[index - 1]

      const dx = room.x - prev.x
      const dy = room.y - prev.y

      const distance = Math.sqrt(dx*dx + dy*dy)

      const angle = Math.atan2(dy,dx) * 180 / Math.PI

      const line = document.createElement("div")

      line.style.position = "absolute"
      line.style.left = `${prev.x + 50}px`
      line.style.top = `${prev.y + 50}px`
      line.style.width = `${distance}px`
      line.style.height = "6px"
      line.style.background = "white"
      line.style.transformOrigin = "0 0"
      line.style.transform = `rotate(${angle}deg)`

      map.appendChild(line)
    }

    const div = document.createElement("div")

    div.className = "room"

    div.style.position = "absolute"
    div.style.left = `${room.x}px`
    div.style.top = `${room.y}px`
    div.style.width = "100px"
    div.style.height = "100px"

    div.innerHTML = `
      <div style="font-size:22px;font-weight:bold;">
        ${room.id}
      </div>

      <div style="margin-top:8px;">
        ${room.type}
      </div>
    `

    if(room.type === "Boss"){
      div.style.background = "darkred"
    }

    map.appendChild(div)
  })

  dungeon.appendChild(map)
}

generateDungeon()
