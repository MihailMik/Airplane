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

        let classSteward
        switch (nCol) {
            case 3: classSteward = 'steward steward3'; break
            case 5: classSteward = 'steward steward5'; break
            default: classSteward = 'steward'; break
        }
        switch (game.phase)
        {
            case 9: classSteward += ' phase9'; break;
            case 8: classSteward += ' phase8'; break;
            case 7: classSteward += ' phase7'; break;
            case 6: classSteward += ' phase6'; break;
            case 5: classSteward += ' phase5'; break;
            case 4: classSteward += ' phase4'; break;
            case 3: classSteward += ' phase3'; break;
            case 2: classSteward += ' phase2'; break;
            case 1: classSteward += ' phase1'; break;
            case -9: classSteward += ' phase-9'; break;
            case -8: classSteward += ' phase-8'; break;
            case -7: classSteward += ' phase-7'; break;
            case -6: classSteward += ' phase-6'; break;
            case -5: classSteward += ' phase-5'; break;
            case -4: classSteward += ' phase-4'; break;
            case -3: classSteward += ' phase-3'; break;
            case -2: classSteward += ' phase-2'; break;
            case -1: classSteward += ' phase-1'; break;
            default: break;
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
