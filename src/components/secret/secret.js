import React from "react"
import s from './secret.module.css'

const Secret = (props) => {
    const game = props.game
    const secretKeyStr = game.secretKeyStr
    const drinksStr = game.drinksStr

    let secretCode = (secretKeyStr === undefined || !game.gameEnded) ? s.empty : s.notEmpty
    return (
        <div className={s.secretField}>
            <div className={secretCode}>
                <p className={s.secretCodeTitle}>Secret code: Key_Drinks</p>
                <p><span className={s.secretCodeTitle}>Key: </span>{secretKeyStr}</p>
                <p><span className={s.secretCodeTitle}>Drinks: </span>{drinksStr}</p>
            </div>

        </div>
    )
}
export default Secret

