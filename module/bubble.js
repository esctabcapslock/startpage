class Bubble{
    constructor(name, href, pos, vel){
        this.name = name
        this.href = href
        this.pos = pos//new Vec((svgwidtth()-circleradius*2)*Math.random()+circleradius, (svgheight-circleradius*2)*Math.random()+circleradius)
        this.vel = vel//new Vec(map(Math.random(),0,1,-vmax,vmax),map(Math.random(),0,1,-vmax,vmax))
        svg.append(this.create())

        this.mouseattractionflag = false
        this.mouseattractionpos = null
    }
    create(){
        // https://stackoverflow.com/questions/9946604/insert-html-code-inside-svg-text-element
        this.ele = document.createElementNS(xmlns, "g");
        const text = document.createElementNS(xmlns,'text')
        text.setAttribute('text-anchor','middle')
        text.innerHTML = `<a xlink:href="${this.href}">${this.name}</a>`
        this.text = text

        const circle = document.createElementNS(xmlns,'circle')
        circle.setAttribute('r',circleradius)
        circle.setAttribute('cx',20+300*Math.random())
        circle.setAttribute('cy',20)
        circle.setAttribute('style',`fill: ${color_list[(rand()*color_list.length)|0]}; stroke: black; stroke-width: 1px;`)
        this.ele.append(circle)  
        this.ele.append(text)
        this.circle = circle 
        this.setpos()

        // 이벤트
        this.ele.addEventListener('mousedown',e=>{
            this.mouseattractionflag = true
            this.mouseattractionpos = Vec.prototype.sub(this.pos,mousepos)
            console.log('[mousedown]')
        })
        this.ele.addEventListener('mouseup',e=>{
            this.mouseup()
        })


        return this.ele;
    }

    mouseup(){
        if(this.mouseattractionflag) this.vel = Vec.prototype.mult(1,mousevel)
        this.mouseattractionflag = false
        this.mouseattractionpos = null
        console.log('[mouseup]')
    }

    setpos(){
        this.circle.setAttribute('cx',this.pos.x+'px')
        this.circle.setAttribute('cy',this.pos.y+'px')
        this.text.setAttribute('x',this.pos.x+'px')
        this.text.setAttribute('y',5+this.pos.y+'px')
    }

    bounce(){
        if(this.pos.x < circleradius){
            this.pos.x = circleradius
            this.vel.x *= -1
        }
        else if(svgwidtth()-this.pos.x < circleradius ){
            this.pos.x = svgwidtth()-circleradius
            this.vel.x *= -1
        }
        if(this.pos.y < circleradius){
            this.pos.y = circleradius
            this.vel.y *= -1
        }else if( this.pos.y > svgheight-circleradius ){
            this.pos.y = svgheight-circleradius
            this.vel.y *= -1
        }
    }


    bouncebubble(bubble){
        const propconst = 100
        const dir =  Vec.prototype.sub(this.pos, bubble.pos);
        const size = dir.mag()
        if(size==0 || size>circleradius*2) return;
        
        dir.normalize()
        // console.log(this.pos, bubble.pos, Vec.prototype.sub(this.pos, bubble.pos))
        // if(!dir.mag) {console.log('error',this.name, this.pos, bubble.pos,dir, dir.mag); return;}
        this.applyforce(dir.mult((size**(-1))*propconst))

    }

    applyforce(force){
        // console.log('[force]',force)
        this.vel.add(force).limit(vmax)
    }

    mouseattraction(){
        if(!this.mouseattractionflag) return false;
        // console.log('mouseattractionpos', this.mouseattractionpos.__val,this.pos.__val,mousepos.__val,)
        // console.log(`Vec.prototype.add(${this.mouseattractionpos.__val}, ${mousepos.__val}),${Vec.prototype.add(this.mouseattractionpos, mousepos).__val}`)
        this.pos =  Vec.prototype.add(this.mouseattractionpos, mousepos)
        // console.log(`this.pos.__val, ${this.pos.__val}`)
    }

    tic(){
        
        this.pos.add(Vec.prototype.mult(0.2,this.vel))
    }
}
