//import {renderCell} from './modules/Cell'
//console.log('ok')


import Game from './modules/Game.js'
let canv=document.getElementById("myCanvas")
let ctx=canv.getContext("2d")
const game = new Game(ctx)
setInterval(run,1000/30)

function run(){
    game.update()
}
