const canvas = document.getElementById("mapCanvas")
const ctx = canvas.getContext("2d")

const TILE = 40

const MAP_WIDTH = 30
const MAP_HEIGHT = 22

const map = []

function createMap(){

  for(let y=0;y<MAP_HEIGHT;y++){

    map[y] = []

    for(let x=0;x<MAP_WIDTH;x++){

      map[y][x] = 0
    }
  }
}

function createRoom(x,y,w,h,type){

  for(let yy=y;yy<y+h;yy++){

    for(let xx=x;xx<x+w;xx++){

      if(
        xx > 0 &&
        yy > 0 &&
        xx < MAP_WIDTH-1 &&
        yy < MAP_HEIGHT-1
      ){
        map[yy][xx] = 1
      }
    }
  }

  return {
    x,
    y,
    w,
    h,
    centerX: Math.floor(x + w/2),
    centerY: Math.floor(y + h/2),
    type
  }
}

function createCorridor(x1,y1,x2,y2){

  let x = x1
  let y = y1

  while(x !== x2){

    map[y][x] = 1

    x += x < x2 ? 1 : -1
  }

  while(y !== y2){

    map[y][x] = 1

    y += y < y2 ? 1 : -1
  }
}

function random(min,max){

  return Math.floor(
    Math.random() * (max-min+1)
  ) + min
}

function generateDungeon(){

  createMap()

  const rooms = []

  const totalRooms = random(10,16)

  let previousRoom = null

  for(let i=0;i<totalRooms;i++){

    const w = random(4,8)
    const h = random(4,8)

    const x = random(1,MAP_WIDTH-w-1)
    const y = random(1,MAP_HEIGHT-h-1)

    const type =
      i === 0
      ? "start"
      : i === totalRooms-1
      ? "boss"
      : "normal"

    const room = createRoom(x,y,w,h,type)

    rooms.push(room)

    if(previousRoom){

      createCorridor(
        previousRoom.centerX,
        previousRoom.centerY,
        room.centerX,
        room.centerY
      )
    }

    previousRoom = room
  }

  drawMap(rooms)
}

function drawMap(rooms){

  ctx.clearRect(0,0,canvas.width,canvas.height)

  ctx.fillStyle = "#ffffff"

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  )

  for(let y=0;y<MAP_HEIGHT;y++){

    for(let x=0;x<MAP_WIDTH;x++){

      if(map[y][x] === 1){

        ctx.fillStyle = "#dcdcdc"

        ctx.fillRect(
          x*TILE,
          y*TILE,
          TILE,
          TILE
        )

        ctx.strokeStyle = "#999"

        ctx.strokeRect(
          x*TILE,
          y*TILE,
          TILE,
          TILE
        )
      }
    }
  }

  rooms.forEach(room=>{

    if(room.type === "start"){

      ctx.fillStyle = "green"

      ctx.beginPath()

      ctx.arc(
        room.centerX*TILE + TILE/2,
        room.centerY*TILE + TILE/2,
        10,
        0,
        Math.PI*2
      )

      ctx.fill()
    }

    if(room.type === "boss"){

      ctx.fillStyle = "red"

      ctx.beginPath()

      ctx.arc(
        room.centerX*TILE + TILE/2,
        room.centerY*TILE + TILE/2,
        10,
        0,
        Math.PI*2
      )

      ctx.fill()
    }
  })
}

generateDungeon()
