
class Border {
    constructor(poslist) {
        if(!check_clockwise(poslist)) poslist.reverse()
        this.set_poslist(poslist)

    }

    set_poslist(poslist){
        this.poslist = poslist
        this.length = poslist.length
    }

    update_pos(poslist) {
        this.poslist = poslist
    }
    check_ccollision_circle(point,radius) {
        if(point.x === NaN || point.y === NaN) throw(`error check_ccollision_circle point${point}`)
        // console.log('point',point)
        const l = this.poslist.length
        // 가장 가까운 선분을 찾는다.
        // 도형의 외부 방향으로 힘을 가한다.
        // 선분을 그어 얼마나 만나는지 확인한다? 같으면 망함

        //함수 1: 직선 사이 거리 확인
        //한수 2: 회전 방향 확인 -> 신발끈 공식 이용...


        // https://en.wikipedia.org/wiki/Point_in_polygon
        // 이게 이름이 있네? ㄷㄷㄷ
        // 초등학생때 만화책에서 본 적 있음

        const dis_list = []
        
        for (let i = 0; i < this.poslist.length; i++) {
            // console.log()
            const [s,e] = [this.poslist[i], this.poslist[(i+1)%l]]
            const d = distance_point2line(point,s,e)
            // console.log(`d:${d}, i:${i}, s:${s}, e:${e}`)
            dis_list.push(d)
        }
        // console.log(`dis_list:${dis_list.map(v=>parseInt(v))}`)
        // console.log(`point:${point}, radius:${radius}, dis_list:${dis_list}, poslist:${this.poslist}`)
        if(dis_list.every(v=>v>radius)) return false // 충돌하지 않음


        // 침투한 방향의 거리 (안쪽 to 바깥쪽) 반환?
        const d = Math.min(...dis_list)
        const idx = dis_list.indexOf(d)
        const [s,e]=  [this.poslist[idx], this.poslist[(idx+1)%l]]
        
        // 시계방향으로 움직인다.
        const p = point.copy().sub(s)
        const p2 = e.copy().sub(s)

        const v =  Math.sign(p2.cross2D(p))
        // console.log(`v:${v}, d:${d}`)
        // console.log('v',v,`p:${p}, p2:${p2}, d:${d}, radious:${radious}, v:${v}`)
        const intrusion =  p2.normalize().rotate2D_90deg().mult(-(radius + d*v))
        // console.log(`intrusion:${intrusion}`)
        return intrusion

        
    }


    

    
}

function check_clockwise(poslist) {
    let sum = 0
    const l = poslist.length
    for (let i = 0; i < poslist.length; i++) {
        // console.log()
        sum += poslist[i].x*poslist[(i+1)%l].y
        sum -= poslist[i].y*poslist[(i+1)%l].x
    }
    return sum>=0
}

function distance_point2point(point1, point2) {
    return Vec.prototype.sub(point1, point2).mag()
}
function distance_point2line(point, startpoint, endpoint) {
    // const d1 = cal_distance_point2point(point, startpoint)
    // const d2 = cal_distance_point2point(point, endpoint)

    const len = distance_point2point(startpoint, endpoint) //직선 길이

    //수선의 발 구하기
    const v = Vec.prototype.sub(endpoint, startpoint).normalize() // 기울기 정규화된거.
    const v_top = Vec.prototype.sub(point, startpoint) // 점까지의 거리
    const orth = v.dot(v_top) //수선의 발 길이
    const foot = v.copy().mult(orth).add(startpoint) //수선의 발
    // const dis = distance_point2point(foot, point) //직선 - 점 거리

    // 수선의 발이 내부의 점이면 직선-점 거리 반환
    if (orth >= 0 && orth <= len) return distance_point2point(foot, point)
    // 아니면 가까운 점에서 길이 반환
    else return Math.min(
        distance_point2point(point, startpoint),
        distance_point2point(point, endpoint)
    )
}