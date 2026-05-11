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

  const canvas = document.createElement("canvas")

  canvas.width = 1800
  canvas.height = 1200

  dungeon.appendChild(canvas)

  const ctx = canvas.getContext("2d")

  ctx.fillStyle = "#0f0f0f"
  ctx.fillRect(0,0,canvas.width,canvas.height)

  const rooms = []

  let currentX = 850
  let currentY = 120

  const totalRooms = 18

  for(let i=0;i<totalRooms;i++){

    const width = 120 + Math.random()*80
    const height = 100 + Math.random()*60

    const room = {
      id:i+1,
      x:currentX,
      y:currentY,
      width,
      height,
      type:i === totalRooms-1
        ? "Boss"
        : random(roomTypes)
    }

    rooms.push(room)

    const direction = Math.floor(Math.random()*5)

    if(direction === 0){
      currentX += 260
    }

    if(direction === 1){
      currentX -= 260
    }

    if(direction === 2){
      currentX += 140
    }

    if(direction === 3){
      currentX -= 140
    }

    currentY += 170
  }

  ctx.strokeStyle = "#888"
  ctx.lineWidth = 18

  for(let i=1;i<rooms.length;i++){

    const prev = rooms[i-1]
    const room = rooms[i]

    const startX = prev.x + prev.width/2
    const startY = prev.y + prev.height/2

    const endX = room.x + room.width/2
    const endY = room.y + room.height/2

    ctx.beginPath()
    ctx.moveTo(startX,startY)
    ctx.lineTo(endX,startY)
    ctx.lineTo(endX,endY)
    ctx.stroke()

    ctx.strokeStyle = "#444"
    ctx.lineWidth = 8

    ctx.beginPath()
    ctx.moveTo(startX,startY)
    ctx.lineTo(endX,startY)
    ctx.lineTo(endX,endY)
    ctx.stroke()

    ctx.strokeStyle = "#888"
    ctx.lineWidth = 18
  }

  rooms.forEach(room => {

    if(room.type === "Boss"){
      ctx.fillStyle = "#5c1111"
    }
    else if(room.type === "Enemigos"){
      ctx.fillStyle = "#3a3a3a"
    }
    else if(room.type === "Cofre"){
      ctx.fillStyle = "#66512c"
    }
    else if(room.type === "NPC"){
      ctx.fillStyle = "#1f4c66"
    }
    else if(room.type === "Puzzle"){
      ctx.fillStyle = "#4f3b66"
    }
    else if(room.type === "Trampa"){
      ctx.fillStyle = "#5a1f1f"
    }
    else{
      ctx.fillStyle = "#2b2b2b"
    }

    ctx.fillRect(
      room.x,
      room.y,
      room.width,
      room.height
    )

    ctx.strokeStyle = "#bbbbbb"
    ctx.lineWidth = 5

    ctx.strokeRect(
      room.x,
      room.y,
      room.width,
      room.height
    )

    ctx.fillStyle = "white"

    ctx.font = "bold 22px Arial"

    ctx.fillText(
      `Sala ${room.id}`,
      room.x + 15,
      room.y + 35
    )

    ctx.font = "18px Arial"

    ctx.fillText(
      room.type,
      room.x + 15,
      room.y + 70
    )

    if(room.type === "Boss"){

      ctx.font = "bold 28px Arial"

      ctx.fillStyle = "#ff4444"

      ctx.fillText(
        "BOSS",
        room.x + 20,
        room.y + room.height - 20
      )
    }
  })
}

generateDungeon()
