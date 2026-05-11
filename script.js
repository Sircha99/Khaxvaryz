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

    if(x < x2){
      x++
    }else{
      x--
    }
  }

  while(y !== y2){

    map[y][x] = 1

    if(y < y2){
      y++
    }else{
      y--
    }
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
    8,
    0,
    Math.PI*2
  )

  ctx.fill()

  ctx.fillStyle = "red"

  ctx.beginPath()

  ctx.arc(
    bossRoom.cx*TILE + TILE/2,
    bossRoom.cy*TILE + TILE/2,
    8,
    0,
    Math.PI*2
  )

  ctx.fill()
}

function generateDungeon(){

  resetMap()

  const rooms = []

  const totalRooms = random(8,14)

  for(let i=0;i<totalRooms;i++){

    const w = random(4,8)
    const h = random(4,8)

    const x = random(1,COLS-w-2)
    const y = random(1,ROWS-h-2)

    carveRoom(x,y,w,h)

    rooms.push({
      x,
      y,
      w,
      h,
      cx:Math.floor(x+w/2),
      cy:Math.floor(y+h/2)
    })
  }

  for(let i=1;i<rooms.length;i++){

    carveCorridor(
      rooms[i-1].cx,
      rooms[i-1].cy,
      rooms[i].cx,
      rooms[i].cy
    )
  }

  const startRoom = rooms[0]
  const bossRoom = rooms[rooms.length-1]

  drawMap(startRoom,bossRoom)
}

generateDungeon()
