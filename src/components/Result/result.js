import React from "react"
import s from './result.module.css';
import game from "../../redux/store";

const Result = (props) => {
    let textPrize = `Prize: ${props.game.prize}`
    let textGame = ''

    let sPrize = s.Prize
    let sGame = s.emptyGame

    if (game.gameEnded) {
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
                {/*dummy element for symmetry*/}
                <td className={sPrize}>
                    <text>{}</text>
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
