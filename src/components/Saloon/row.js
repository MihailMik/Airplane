import React from "react"
import s from './row.module.css'
import game from "../../redux/store";
import Seat from "./seat";

const Row = (props) => {
    const isPass = (col, nCol) =>
    {
        const passes = [
            [1, 1],     //nCol = 0
            [1, 1],     //nCol = 1
            [1, 1],     //nCol = 2
            [1, 1],     //nCol = 3
            [2, 2],     //nCol = 4
            [3, 3],     //nCol = 5
            [3, 3],     //nCol = 6
            [2, 5],     //nCol = 7
            [2, 6],     //nCol = 8
            [3, 6],     //nCol = 9
            [3, 7],     //nCol = 10
            [3, 8],     //nCol = 11
            [3, 9],     //nCol = 12
        ]
        if (passes[nCol][0] === col ||
            passes[nCol][1] === col) return true
        else return false
    }
    let game = props.game
    let row = props.row

    let cols = []
    for (let col = 0; col < game.nCol; col++) {
        // if (col && col%2 === 0) cols.push (<text className={s.empty}>ab</text>)
        if (isPass (col, game.nCol)) cols.push (<text className={s.empty}>ab</text>)
        cols.push(<Seat game = {game} row = {row} col = {col}/>)
    }

    return (
        <div>
            {cols}
        </div>
    )
}
export default Row

