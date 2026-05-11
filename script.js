const roomTypes = [
  "E",
  "C",
  "N",
  "P",
  "T",
  "V"
]

function random(arr){
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateDungeon(){

  const dungeon = document.getElementById("dungeon")

  dungeon.innerHTML = ""

  const canvas = document.createElement("canvas")

  canvas.width = 1400
  canvas.height = 900

  dungeon.appendChild(canvas)

  const ctx = canvas.getContext("2d")

  ctx.fillStyle = "#111"
  ctx.fillRect(0,0,canvas.width,canvas.height)

  const rooms = []

  let x = 700
  let y = 100

  const totalRooms = 15

  for(let i=0;i<totalRooms;i++){

    const room = {
      id:i+1,
      x,
      y,
      width:80,
      height:80,
      type:i === totalRooms-1
        ? "BOSS"
        : random(roomTypes)
    }

    rooms.push(room)

    const dir = Math.floor(Math.random()*3)

    if(dir === 0){
      x += 160
    }

    if(dir === 1){
      x -= 160
    }

    y += 100
  }

  ctx.strokeStyle = "white"
  ctx.lineWidth = 4

  for(let i=1;i<rooms.length;i++){

    const prev = rooms[i-1]
    const room = rooms[i]

    ctx.beginPath()

    ctx.moveTo(
      prev.x + prev.width/2,
      prev.y + prev.height/2
    )

    ctx.lineTo(
      room.x + room.width/2,
      room.y + room.height/2
    )

    ctx.stroke()
  }

  rooms.forEach(room => {

    if(room.type === "BOSS"){
      ctx.fillStyle = "#7f1d1d"
    } else {
      ctx.fillStyle = "#27272a"
    }

    ctx.fillRect(
      room.x,
      room.y,
      room.width,
      room.height
    )

    ctx.strokeStyle = "white"

    ctx.strokeRect(
      room.x,
      room.y,
      room.width,
      room.height
    )

    ctx.fillStyle = "white"

    ctx.font = "16px Arial"

    ctx.fillText(
      room.id,
      room.x + 30,
      room.y + 25
    )

    ctx.font = "14px Arial"

    ctx.fillText(
      room.type,
      room.x + 18,
      room.y + 50
    )
  })
}

generateDungeon()
