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
        <div>
            <div className={sPrize}>
                <text>{textPrize}</text>
            </div>

            <div className={sGame}>
                <text>{textGame}</text>
            </div>
        </div>
    )
}
export default Result
