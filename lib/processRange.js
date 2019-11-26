import indexToPf from './indexToPF'
import Range from './Range'
import Hand from './Hand'
import c from './constants'

export function getCombosFromIndex(index){
    const PfCombosName =  indexToPf[index]
    let range = new Range(PfCombosName)
    return range.hands
}

export function combosToHands(combos, board){
    return combos.map( (e, i) => {
            return new Hand([...board, ...combos[i]])
    })
}

export default function processRange(range, board){
    return range.map((e,i)=>{
        const combos = getCombosFromIndex(e)
        const handArray = combosToHands(combos, board)
        let count = [0,0,0,0,0,0,0,0,0,0]
        handArray.forEach(hand => count[hand.strength]++)
        return{
            inRange: e,
            hands: combosToHands(combos, board),
            count
        }
    })
}