import React from "react"
import s from './result.module.css';

const Result = (props) => {
    let game = props.game

    let textPrizeMax    = `Max Prize: ${game.prizeMax}`
    let textPrize       = `Your Prize: ${game.prize}`
    let textGame        = ''

    let sPrizeMax   = s.PrizeMax
    let sPrize      = s.Prize
    let sGame       = s.empty

    if (game.gameEnded) {
        sPrizeMax = s.empty
        if (game.hintChecked) {
            textGame = 'Initial Secret State'
            sPrize = s.empty
        } else
            textGame = 'Final Game State'
        sGame = s.Game
    }

    return (
        <div className={s.Row}>
            <div className={`${s.general} ${sPrizeMax}`}>
                <label>{textPrizeMax}</label>
            </div>

            <div className={`${s.general} ${sGame}`}>
                <label>{textGame}</label>
            </div>

            <div className={`${s.general} ${sPrize}`}>
                <label>{textPrize}</label>
            </div>
        </div>
    )
}
export default Result
