const canvas = document.getElementById("mapCanvas")
const ctx = canvas.getContext("2d")

const TILE = 32
const COLS = 35
const ROWS = 25

let map = []

function random(min,max){
  return Math.floor(Math.random()*(max-min+1))+min
}

function resetMap(){

  map = []

  for(let y=0;y<ROWS;y++){

    const row = []

    for(let x=0;x<COLS;x++){
      row.push(0)
    }

    map.push(row)
  }
}

function carveRoom(x,y,w,h){

  for(let yy=y;yy<y+h;yy++){

    for(let xx=x;xx<x+w;xx++){

      if(
        xx > 0 &&
        yy > 0 &&
        xx < COLS-1 &&
        yy < ROWS-1
      ){
        map[yy][xx] = 1
      }
    }
  }
}

function carveCorridor(x1,y1,x2,y2){

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

function drawMap(startRoom,bossRoom){

  ctx.clearRect(0,0,canvas.width,canvas.height)

  ctx.fillStyle = "#ffffff"

  ctx.fillRect(0,0,canvas.width,canvas.height)

  for(let y=0;y<ROWS;y++){

    for(let x=0;x<COLS;x++){

      if(map[y][x] === 1){

        ctx.fillStyle = "#e5e5e5"

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

  ctx.fillStyle = "green"

  ctx.beginPath()

  ctx.arc(
    startRoom.cx*TILE + TILE/2,
    startRoom.cy*TILE + TILE/2,
    10,
    0,
    Math.PI*2
  )

  ctx.fill()

  ctx.fillStyle = "red"

  ctx.beginPath()

  ctx.arc(
    bossRoom.cx*TILE + TILE/2,
    bossRoom.cy*TILE + TILE/2,
    10,
    0,
    Math.PI*2
  )

  ctx.fill()
}

function roomOverlaps(x,y,w,h){

  for(let yy=y-1;yy<y+h+1;yy++){

    for(let xx=x-1;xx<x+w+1;xx++){

      if(
        yy >= 0 &&
        xx >= 0 &&
        yy < ROWS &&
        xx < COLS
      ){

        if(map[yy][xx] === 1){
          return true
        }
      }
    }
  }

  return false
}

function generateDungeon(){

  resetMap()

  const rooms = []

  const totalRooms = random(10,16)

  let attempts = 0

  while(
    rooms.length < totalRooms &&
    attempts < 200
  ){

    attempts++

    const w = random(3,5)
    const h = random(3,5)

    const x = random(1,COLS-w-2)
    const y = random(1,ROWS-h-2)

    if(roomOverlaps(x,y,w,h)){
      continue
    }

    carveRoom(x,y,w,h)

    const room = {
      x,
      y,
      w,
      h,
      cx:Math.floor(x+w/2),
      cy:Math.floor(y+h/2)
    }

    if(rooms.length > 0){

      const prev = rooms[rooms.length-1]

      carveCorridor(
        prev.cx,
        prev.cy,
        room.cx,
        room.cy
      )
    }

    rooms.push(room)
  }

  const startRoom = rooms[0]
  const bossRoom = rooms[rooms.length-1]

  drawMap(startRoom,bossRoom)
}

generateDungeon()
