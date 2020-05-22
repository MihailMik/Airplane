import React from "react"
import s from './row.module.css'
import Seat from "./seat";

const Row = (props) => {
    const game = props.game
    const row = props.row
    const nCol = game.nCol
    const isPass = game.isPass

    const getSteward = () => {
        return {
            src: `/img/girl.png`
            , classname: 'steward'
            , row: 1
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
        cols.push(<img src={currentSteward.src} alt={''} className={currentSteward.classname}/>);
    }

    return (
        <div className={'row-with-steward'}>
            {cols}
        </div>
    )
}
export default Row

