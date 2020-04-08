import eventHandler from './eventHandlers.js'
import Cell from './Cell.js'

export default class Game{
    constructor(ctx){
        console.log('Game Created')
        this.ctx = ctx
        this.state = {
            points:2,
            lost:false,
            cells: [
                [{value:0, cell:null},{value:0, cell:null},{value:0, cell:null},{value:0, cell:null}],
                [{value:0, cell:null},{value:0, cell:null},{value:0, cell:null},{value:0, cell:null}],
                [{value:0, cell:null},{value:0, cell:null},{value:0, cell:null},{value:0, cell:null}],
                [{value:0, cell:null},{value:0, cell:null},{value:0, cell:null},{value:0, cell:null}]
            ],
            fadingCells: [],
        }
        new eventHandler(this)
        //this.cell = new Cell(4,{x:3,y:0})
        this.addCell()
        this.addCell()
    }
    update(){
        this.render()
    }
    render(){
        this.ctx.clearRect(0, 0, 420, 460)
        this.ctx.fillStyle='rgb(187,173,160)'
        this.ctx.fillRect(0,40,420,420)
        //this.cell.render(this.ctx)
        this.renderFaded()
        this.renderCells()
        if(this.state.lost){
            this.renderLoseScreen()
        }
    }
    renderCells(){
        for(let i=0;i<4;i++){
            for(let j=0;j<4;j++){
                if(this.state.cells[i][j].value!=0)
                    this.state.cells[i][j].cell.render(this.ctx)
                else{
                    this.ctx.fillStyle='rgb(205,192,180)';
                    this.ctx.fillRect(j*100+20,i*100+60, 80,80);
                }
            }
        }
    }
    renderFaded(){
        let arrayAux = this.state.fadingCells
        arrayAux.map((item,index) => {
            if(!item.cell.isFaded()){
                item.cell.fade(this.ctx,item.move)
            }else{
                console.log('Finished Fading')
                this.state.fadingCells.splice(index,1)
            }
        })
    }
    moveBoard(command){
        //const cells = this.state.cells
        //console.log('Points:' + this.state.points)
        let isValidMove = null
        let side = 1
        let moved = false
        switch(command) {
            case 'ArrowLeft':
                isValidMove = 'left'
                side = 1
                break;
            case 'ArrowUp':
                isValidMove = 'up'
                side = 1
                break;
            case 'ArrowRight':
                isValidMove = 'right'
                side = -1               
                break;
            case 'ArrowDown':
                isValidMove = 'down'
                side = -1

                break;
        }
        if(isValidMove){
            if(isValidMove=='left' || isValidMove=='right'){
                for(let r=0;r<4;r++){ // loop rows
                    let totalRow = 0
                    this.state.cells[r].map(a=>totalRow+=!!a.value)
                    if(totalRow!=0){//no need to merge or move a empty row
                        console.log('totalRow:' + totalRow)
                        for(let i=side==1?0:3;side==1?i<4:i>=0;i+=side){//loop merge
                            if(this.state.cells[r][i].value!=0){
                                for(let j=i+side;side==1?j<4:j>=0;j+=side){
                                    if(this.state.cells[r][i].value == this.state.cells[r][j].value){
                                        //merge (Depois criar função pra animação)
                                        this.state.cells[r][i].value *= 2
                                        this.state.cells[r][i].cell.merge(isValidMove)
                                        totalRow-=1
                                        this.state.fadingCells.push({
                                            move:isValidMove,
                                            cell: this.state.cells[r][j].cell
                                        })
                                        this.state.cells[r][j] = {value:0, cell:null}
                                        moved = true
                                    }else if(this.state.cells[r][i].value!=this.state.cells[r][j].value && this.state.cells[r][j].value!=0){
                                        break
                                    }
                                }
                            }
                        }
                        for(let i=side==1?0:3;side==1?i<totalRow:i>3-totalRow;i+=side){
                            while(this.state.cells[r][i].value == 0){
                                moved = true
                                for(let j=i;side==1?j<3:j>0;j+=side){
                                    this.state.cells[r][j] = this.state.cells[r][j+side]
                                }
                                this.state.cells[r][side==1?3:0] = {value:0, cell:null}
                            }
                        }
                    }
                }
            }else{
                for(let c=0;c<4;c++){ // loop colls
                    let totalColls = 0
                    this.state.cells.map((a)=>{a.map((b,index)=>{if(index==c)totalColls+=!!b.value})})
                    console.log(`TotalColls[${c}]:${totalColls}`)
                    if(totalColls!=0){//no need to merge or move a empty Collum
                        for(let i=side==1?0:3;side==1?i<4:i>=0;i+=side){//loop merge
                            if(this.state.cells[i][c].value!=0){
                                for(let j=i+side;side==1?j<4:j>=0;j+=side){
                                    if(this.state.cells[i][c].value == this.state.cells[j][c].value){
                                        //merge (Depois criar função pra animação)
                                        this.state.cells[i][c].value *= 2
                                        this.state.cells[i][c].cell.merge(isValidMove)
                                        totalColls-=1
                                        this.state.fadingCells.push({
                                            move:isValidMove,
                                            cell: this.state.cells[j][c].cell
                                        })
                                        this.state.cells[j][c] = {value:0, cell:null}
                                        moved = true
                                    }else if(this.state.cells[i][c].value!=this.state.cells[j][c].value && this.state.cells[j][c].value!=0){
                                        break
                                    }
                                }
                            }
                        }
                        for(let i=side==1?0:3;side==1?i<totalColls:i>3-totalColls;i+=side){
                            while(this.state.cells[i][c].value == 0){
                                moved = true
                                //console.log(`Got one zero: i:${i}`)
                                for(let j=i;side==1?j<3:j>0;j+=side){
                                    this.state.cells[j][c] = this.state.cells[j+side][c]
                                }
                                this.state.cells[side==1?3:0][c] = {value:0, cell:null}
                            }
                        }
                    }
                }
            }
            for(let y=0;y<4;y++){
                for(let x=0;x<4;x++){
                    if(this.state.cells[y][x].cell!=null)
                        this.state.cells[y][x].cell.setPosition({x,y})
                }
            }   
            if(moved)
                this.addCell()         
        }
    }
    addCell(){
        if(!this.loseCondition()){
            const cellValue = (Math.floor(Math.random()*2)+1)*2 //Random value 2 or 4
            //try to find a place for the cell
            let x = 0
            let y = 0
            do{
                x = Math.floor(Math.random()*4)
                y = Math.floor(Math.random()*4)
            }while(this.state.cells[y][x].value!=0)
            let cell = {value:cellValue, cell: new Cell(cellValue,{x,y})}
            this.state.cells[y][x] = cell
        }
    }
    renderLoseScreen(){
        this.ctx.globalAlpha = 0.4
        this.ctx.fillStyle='rgb(0,0,0)';
        this.ctx.fillRect(0, 0, 420, 460);
        this.ctx.globalAlpha = 1
        this.ctx.fillStyle = 'white';
        this.ctx.font=`60px Calibri`;
        this.ctx.fillText('Você Perdeu!',50,260)
    }
    loseCondition(){
        let count = 0
        for(let i=0;i<4;i++){
            for(let j=0;j<4;j++){
                if(this.state.cells[i][j].value!=0)
                    count++
            }
        }
        if(count==16){
            console.log('Perdeu!')
            this.state.lost = true
            return true
        }else{
            return false
        }
    }
    
}

                //const totalRow = this.state.cells[r].map(a=>a.value).reduce((ac,at)=>{return ac+!!at})
                // console.log('r:'+r+'numero por linha' + totalRow)
                // if(totalRow != 0){ //if not row full of zeros
                    
                    //for(let n=0;n<4-totalRow;n++){