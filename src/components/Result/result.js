import React from "react"
import s from './result.module.css';
import game from "../../redux/store";

const Result = (props) => {
    let textPrizeMax = `Max Prize: ${props.game.prizeMax}`
    let textPrize = `Your Prize: ${props.game.prize}`
    let textGame = ''

    let sPrizeMax = s.PrizeMax
    let sPrize = s.Prize
    let sGame = s.emptyGame

    if (game.gameEnded) {
        sPrizeMax = s.emptyPrize
        if (game.hintChecked) {
            textGame = 'Initial Secret State'
            sPrize = s.emptyPrize
        }
            else textGame = 'Final Game State'
        sGame = s.Game
    }

    return (
        <table className={s.Row}>
            <tr className={s.Row}>
                <td className={sPrizeMax}>
                    <text>{textPrizeMax}</text>
                </td>

                <td className={sGame}>
                    <text>{textGame}</text>
                </td>

                <td className={sPrize}>
                    <text>{textPrize}</text>
                </td>
            </tr>
        </table>
    )
}
export default Result
