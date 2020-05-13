import React from "react"
import s from './saloon.module.css'
import game from "../../redux/store";
import Row from "./row";

const Saloon = (props) => {
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
export default Saloon

