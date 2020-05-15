import React from "react"
import Row from "./row";

const Cabin = (props) => {
    let game = props.game
    let nRow =  game.nRow

    let rows = []
    for (let row = 0; row < nRow; row++) {
        rows[row] = <Row game = {game} row = {row}/>
    }

    return (
        <div>
            {rows}
        </div>
    )
}
export default Cabin

