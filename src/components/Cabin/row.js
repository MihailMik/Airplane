import React from "react"
import s from './row.module.css'
import Seat from "./seat";

const Row = (props) => {
    const game = props.game
    const row = props.row
    const nCol = game.nCol
    const isPass = game.isPass

    let cols = []
    for (let col = 0; col < nCol; col++) {
        // if (isPass (col, nCol)) cols.push (<text className={s.empty}>ab</text>)
        if (isPass (col, nCol)) cols.push (<button className={s.empty}></button>)
        cols.push(<Seat game = {game} row = {row} col = {col}/>)
    }

    return (
        <div>
            {cols}
        </div>
    )
}
export default Row

