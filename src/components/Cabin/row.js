import React from "react"
import s from './row.module.css'
import Seat from "./seat";

const Row = (props) => {
    const game = props.game
    const row = props.row
    const nCol = game.nCol
    const isPass = game.isPass

    const getSteward = () => {
        const pict = {undefined     : '/img/Truck_0.png',
                      leftTea       : '/img/L_T.png',
                      leftCoffee    : '/img/L_C.png',
                      leftTeaCoffee : '/img/L_CT.png',
                      rightTea      : '/img/R_T.png',
                      rightCoffee   : '/img/R_C.png',
                      rightTeaCoffee: '/img/R_CT.png'
        }

        let stewardRow = game.activeRow
        let stewardPict = pict.undefined

        if (game.nextServed !== undefined) {
            let stewardCol = game.getCol (game.nextServed)
            stewardRow = game.getRow (game.nextServed)

            let left = (stewardCol < game.nCol/2)
            if (left) {
                stewardPict = game.isQuestionTea ? pict.leftTea : game.isQuestionCoffee ? pict.leftCoffee : pict.leftTeaCoffee
            }
            else {
                stewardPict = game.isQuestionTea ? pict.rightTea : game.isQuestionCoffee ? pict.rightCoffee : pict.rightTeaCoffee
            }
        }

        return {
            src: stewardPict
            , classname: `steward col${nCol} phase${game.phase}`
            , row: stewardRow
        }
    };

    const currentSteward = getSteward();

    let cols = []
    for (let col = 0; col < nCol; col++) {
        if (isPass(col, nCol)) {
            cols.push(<button key={'pass'} className={s.empty}></button>)
        }

        cols.push(<Seat key={col} game={game} row={row} col={col}/>)

    }

    if (currentSteward.row === row) {
        cols.push(<img src={currentSteward.src} key={'steward'} alt={''} className={currentSteward.classname}/>);
    }

    return (
        <div className={'row-with-steward'}>
            {cols}
        </div>
    )
}
export default Row
