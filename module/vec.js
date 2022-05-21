class Vec{
    constructor(x,y){
        // console.log('arguments',arguments)
        if(arguments.length==0) return false
        const ar = []
        for(const key in arguments) {if(typeof arguments[key] != 'number') throw('인자가 이상함'); else ar.push(arguments[key])}
        this.__val = ar
        this.size = ar.length

    }

    get x (){return this.__val[0]} 
    get y (){return this.__val[1]} 
    get z (){return this.__val[2]} 

    set x (n){if(this.size>=1) this.__val[0] = n; else throw(`길이가 맞지 않음. 길이:${this.size}`)}  
    set y (n){if(this.size>=2) this.__val[1] = n; else throw(`길이가 맞지 않음. 길이:${this.size}`)}
    set z (n){if(this.size>=3) this.__val[2] = n; else throw(`길이가 맞지 않음. 길이:${this.size}`)}


    add(v,v2){
        if (arguments.length==1 && v instanceof Vec){
            if(v.size != this.size) throw(`서로 길이가 맞지 않음`)
            for(const index in this.__val) this.__val[index] += v.__val[index]
            return this
        }
        else if(arguments.length==2 && [...arguments].every(v=>v instanceof Vec)){
            if(v.size != v2.size) throw(`서로 길이가 맞지 않음`)
            return v.copy().add(v2)
        }else throw('잘못된 입력')
        
    }
    sub(v,v2){
        if (arguments.length==1 && v instanceof Vec){
            if(v.size != this.size) throw(`서로 길이가 맞지 않음`)
            for(const index in this.__val) this.__val[index] -= v.__val[index]
            return this
        }
        else if(arguments.length==2 && [...arguments].every(v=>v instanceof Vec)){
            if(v.size != v2.size) throw(`서로 길이가 맞지 않음`)
            return v.copy().sub(v2)
        }else throw('잘못된 입력')
    }
    mult(c,v){
        if(typeof c != 'number') throw(`c is not number, ${c}`)
        if(arguments.length==1){
            for(const index in this.__val) this.__val[index] *= c
            return this
        }
        else if(arguments.length==2 && v instanceof Vec ){
            return v.copy().mult(c)
        }else throw('잘못된 입력')
    }

    mag(){
        return Math.sqrt(this.__val.reduce((a,b)=>a+b*b,0))
    }
    normalize(){
        const l = this.mag()
        if(l==0) throw('크기가 0이라 정상화 불가능')
        this.mult(1/l)
        return this
    }
    copy(){
        return new Vec(...this.__val)
    }

    limit(maxvalue){
        if (this.mag() > maxvalue){
            return this.normalize().mult(maxvalue)
        }
        else return this
    }

    dot(v,v2){
        if (arguments.length==1 && v instanceof Vec){
            if(v.size != this.size) throw(`서로 길이가 맞지 않음`)
            return this.__val.map((c,i)=>c*v.__val[i]).reduce((a,b)=>a+b)
        }
        else if(arguments.length==2 && [...arguments].every(v=>v instanceof Vec)){
            if(v.size != v2.size) throw(`서로 길이가 맞지 않음`)
            return v.copy().dot(v2)
        }else throw('잘못된 입력')
    }

    cross2D(v){
        if(v.size != 2) throw(`길이가 2가 아님`)
        if (!(v instanceof Vec)) throw(`v가 벡터가 아니고 ${v}`)
        return this.x * v.y - this.y*v.x
    }


    rotate2D(t){
        if(this.size != 2) throw(`길이가 2가 아님`)
        const [c,s] = [Math.cos(t), Math.sin(t)];
        const [x, y] = [this.x*c - this.y*s, this.x*s + this.y*c]; 
        this.x = x
        this.y = y
        return this
    }

    rotate2D_90deg(){
        if(this.size != 2) throw(`길이가 2가 아님`)
        const [c,s] = [0,1]
        const [x, y] = [this.x*c - this.y*s, this.x*s + this.y*c]; 
        this.x = x
        this.y = y
        return this
    }


    toString(){
        return JSON.stringify(this.__val)
    }
}