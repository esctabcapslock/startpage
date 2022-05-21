class Bubble{
    constructor(name, href, pos, vel, radius){
        this.name = name
        this.href = href
        this.radius = radius
        this.pos = pos//new Vec((svgwidtth()-this.radius*2)*Math.random()+this.radius, (svgheight-this.radius*2)*Math.random()+this.radius)
        this.vel = vel//new Vec(map(Math.random(),0,1,-vmax,vmax),map(Math.random(),0,1,-vmax,vmax))
        this.color = color_list[(rand()*color_list.length)|0]
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
        circle.setAttribute('r',this.radius)
        circle.setAttribute('cx',20+300*Math.random())
        circle.setAttribute('cy',20)
        circle.setAttribute('style',`fill: ${this.color}; stroke: black; stroke-width: 1px;`)
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
        if(this.pos.x < this.radius){
            this.pos.x = this.radius
            this.vel.x *= -1
        }
        else if(svgwidtth()-this.pos.x < this.radius ){
            this.pos.x = svgwidtth()-this.radius
            this.vel.x *= -1
        }
        if(this.pos.y < this.radius){
            this.pos.y = this.radius
            this.vel.y *= -1
        }else if( this.pos.y > svgheight()-this.radius ){
            this.pos.y = svgheight()-this.radius
            this.vel.y *= -1
        }
    }


    bouncebubble(bubble){
        const propconst = 100
        const dir =  Vec.prototype.sub(this.pos, bubble.pos);
        const size = dir.mag()
        if(size==0 || size>this.radius*2) return;
        
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

    colordo(){
        this.circle.style.fill = `rgb(255,0,0)`
        setTimeout(() => {
            this.circle.style.fill = this.color
        }, 1000*0.01);
    }
}
