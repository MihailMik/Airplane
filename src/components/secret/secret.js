import React from "react"
import s from './secret.module.css'

const Secret = (props) => {
    const game = props.game
    const secretKeyStr = game.secretKeyStr
    const drinksStr = game.drinksStr

    //Составляем строку, где цифры отображаются одним цветом, а все остальное - другим
    let rows = []
    let i = 0
    for (let row = 0; row < game.nRow; row++) {
        while (drinksStr[i]>=0 && drinksStr[i]<=9) {
            rows.push(<span className={s.openCodeTitle} key={i}>{drinksStr[i]}</span>)
            i++
        }
        rows.push(<span key={i}>{drinksStr.substr (i, game.nCol)}</span>)
        i += game.nCol
    }

    let secretCode = (secretKeyStr === undefined || !game.gameEnded) ? s.empty : s.notEmpty

    return (
        <div className={s.secretField}>
            <div className={secretCode}>
                <p><span className={s.secretCodeTitle}>Secret code: </span>{'Key_Drinks'}</p>
                <p><span className={s.secretCodeTitle}>Key: </span>{secretKeyStr}</p>
                <p><span className={s.secretCodeTitle}>Drinks: </span>
                    {rows}
                </p>
            </div>

        </div>
    )
}
export default Secret

