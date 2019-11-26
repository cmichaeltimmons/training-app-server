import c from './constants';

export function isFlushDraw(hand) {
    const count = [0, 0, 0, 0]
    hand.forEach(element => {
        if (element.includes('c')) {
            count[0] = count[0] + 1
        }
        if (element.includes('d')) {
            count[1] = count[1] + 1
        }
        if (element.includes('h')) {
            count[2] = count[2] + 1
        }
        if (element.includes('s')) {
            count[3] = count[3] + 1
        }
    })
    let ret = false
    count.forEach(num => {
        if (num === 4) {
            ret = true
        }
    })
    return ret
}

export function isBackDoorFlushDraw(hand) {
    const count = [0, 0, 0, 0]
    //console.log(count)
    hand.forEach(element => {
        if (element.includes('c')) {
            count[0] = count[0] + 1
        }
        if (element.includes('d')) {
            count[1] = count[1] + 1
        }
        if (element.includes('h')) {
            count[2] = count[2] + 1
        }
        if (element.includes('s')) {
            count[3] = count[3] + 1
        }
    })
    let ret = false
    count.forEach(num => {
        if (num === 3) {
            ret = true
        }
    })
    return ret
}

export function isOESD(hand) {
    let ranks = hand.map(e => c.RANK_STRENGTHS[e.slice(0, 1)])
    ranks = ranks.sort((a, b) => b - a)
    let count = 0
    let index
    if (ranks.length > 3) {
        const end = ranks.length - 2
        for (index = 0; index <= end; index++) {
            if ((ranks[index] - ranks[index + 1]) === 1) {
                count = count + 1
            } else {
                count = 0
            }
        }
        return (count === 3)
    } else {
        return false
    }

}

export function isGutshot(hand) {
    let ranks = hand.map(e => c.RANK_STRENGTHS[e.slice(0, 1)])
    //remove pairs
    ranks = [...new Set(ranks)]
    ranks = ranks.sort((a, b) => b - a)
    if (ranks.length <= 3) {
        return false
    }
    if (ranks.length >= 4) {
        if((ranks[0]-ranks[3]) === 4){
            return true
        }
    }
    if (ranks.length >= 5) {
        if((ranks[1]-ranks[4]) === 4){
            return true
        }
    }
    if (ranks.length >= 6) {
        if((ranks[2]-ranks[5]) === 4){
            return true
        }
    }
    if (ranks.length >= 7) {
        if((ranks[3]-ranks[7]) === 4){
            return true
        }
    }
    return false
}