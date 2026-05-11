const roomColors = {

    y += 28
  })
}

function generateDungeon(){

  ctx.clearRect(0,0,canvas.width,canvas.height)

  ctx.fillStyle = "#0b0f16"
  ctx.fillRect(0,0,canvas.width,canvas.height)

  drawLegend()

  const rooms = []

  let currentX = 700
  let currentY = 100

  const totalRooms = 15

  for(let i=0;i<totalRooms;i++){

    const type =
      i === totalRooms-1
      ? "Boss"
      : random(roomTypes)

    const room = {
      id:i+1,
      name:generateRoomName(type),
      type,
      x:currentX,
      y:currentY,
      width:140,
      height:100
    }

    rooms.push(room)

    const direction = Math.floor(Math.random()*4)

    if(direction === 0){
      currentX += 220
    }

    if(direction === 1){
      currentX -= 220
    }

    if(direction === 2){
      currentX += 100
    }

    if(direction === 3){
      currentX -= 100
    }

    currentY += 130
  }

  for(let i=1;i<rooms.length;i++){
    drawConnection(rooms[i-1],rooms[i])
  }

  rooms.forEach(room=>{
    drawRoom(room)
  })

  drawInfo(rooms)
}

generateDungeon()
