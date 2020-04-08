import getCellPattern from './cellPatterns.js'
export default class Cell{
    constructor(value, position){
        this.state = {
            merging: null,
            step: 0,
            faded: false,
            alpha:1
        }
        this.value = value
        this.position = {x:position.x*100+20, y:position.y*100+60}
        //this.pattern = getCellPattern(this.value)
    }
    isFaded(){
        return this.state.faded
    }
    render(ctx){
        if(this.state.merging){
            this.drawCell(ctx, this.value/2, this.state.step)
            this.state.step++
        }
        else{
            this.drawCell(ctx, this.value, 0)
        }
        if(this.state.step>6){
            this.state.step = 0
            this.state.merging = null
        }

    }
    setPosition(position){
        this.position = {x:position.x*100+20, y:position.y*100+60}
    }
    merge(move){
        this.value*=2
        this.state.merging = move
    }
    fade(ctx, move){
        if(this.state.step<5){
            console.log(`Cell ${(this.position.x-20)/100 + 1},${(this.position.y-60)/100 + 1} is Fading ${move}`)
            let stepAlpha = [0.8, 0.65, 0.5, 0.35, 0.2]
            switch(move){
                case 'right':this.position.x+=20;break
                case 'left':this.position.x-=20;break
                case 'up':this.position.y-=20;break
                case 'down':this.position.y+=20;break
            }
            this.state.alpha = stepAlpha[this.state.step]
            this.drawCell(ctx,this.value,0)
            this.state.step++
        }else{
            this.state.faded = true
        }
    }
    drawCell(ctx, value, step){
        let stepScale = [1, 1.1, 1.15, 1.2, 1.15, 1.1, 1] // 0, 8, 12, 16, 12, 8, 0
        let stepOffset = [0, 4, 6, 8, 6, 4, 0]
        this.pattern = getCellPattern(value)
        ctx.globalAlpha = this.state.alpha
        ctx.fillStyle=this.pattern.backgroundColor;
        ctx.fillRect(this.position.x-stepOffset[step],this.position.y-stepOffset[step],80*stepScale[step],80*stepScale[step]);
        ctx.fillStyle =this.pattern.letterColor;
        ctx.font=`${this.pattern.fontSize} Calibri`;
        let text = `${value}`;
        ctx.fillText(text,this.position.x+this.pattern.offsetX,this.position.y+this.pattern.offsetY)
        ctx.globalAlpha = 1
    }
}