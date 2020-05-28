import React from "react"
import s from './row.module.css'
import Seat from "./seat";

const Row = (props) => {
    const game = props.game
    const row = props.row
    const nCol = game.nCol
    const isPass = game.isPass

    const getSteward = () => {
        let stewardRow = game.activeRow
        let stewardPict = `/img/girl_N_0.png`

        if (game.nextServed) {
            let stewardCol = game.getCol (game.nextServed)
            stewardRow = game.getRow (game.nextServed)
            stewardPict = (stewardCol >= game.nCol/2) ?`/img/girl_N0_right.png`:`/img/girl_N0_left.png`
        }

        let classSteward
        switch (nCol) {
            case 3: classSteward = 'steward steward3'; break
            case 5: classSteward = 'steward steward5'; break
            default: classSteward = 'steward'; break
        }
        return {
            src: stewardPict
            , classname: classSteward
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
