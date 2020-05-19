import React from "react"
import s from './result.module.css';
import game from "../../redux/store";

const Result = (props) => {
    let textPrize = `Prize: ${props.game.prize}`
    let textGame = ''

    let sPrize = s.Prize
    let sGame = s.empty

    if (game.gameEnded) {
        if (game.hintChecked) {
            textGame = 'Initial Secret State'
            sPrize = s.PrizeWhite
        } else textGame = 'Final Game State'
        sGame = s.Game
    }

    return (
        <tr>
            <td className={sGame}>
                <text>{textGame}</text>
            </td>
            <td className={sPrize}>
                <text>{textPrize}</text>
            </td>
        </tr>
    )
}
export default Result
