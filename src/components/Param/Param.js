import React from "react"
import s from './Param.module.css';

const Param = (props) => {
    let game = props.game
    let [disabledT, disabledC, disabledW] = (game.randomType === 'W12') ? [true, false, true] : [true, true, true]
    return (
        <div>
            {/*Салон*/}
            <div>
                <label className={s.paramTitle}>Cabin</label>

                <label className={s.paramName}>Rows:</label>
                <input className={s.paramValue} value={game.nRowStr}
                       onChange={(e) => game.onChangeRow(e.target.value)}></input>

                <label className={s.paramName}>Seats in row:</label>
                <input className={s.paramValue} value={game.nColStr}
                       onChange={(e) => game.onChangeCol(e.target.value)}></input>
            </div>

            {/*Предпочтения*/}
            <div>
                <label className={s.paramTitle}>Answers</label>

                <label className={s.paramName}>Tea:</label>
                <input className={s.paramValue} value={game.nPreferTeaStr} disabled={disabledT}
                       onChange={(e) => game.onChangePreferTea(e.target.value)}></input>

                <label className={s.paramName}>Coffee:</label>
                <input className={s.paramValue} value={game.nPreferCoffeeStr} disabled={disabledC}
                       onChange={(e) => game.onChangePreferCoffee(e.target.value)}></input>

                <label className={s.paramName}>Water:</label>
                <input className={s.paramValue} value={game.nPreferWaterStr} disabled={disabledW}
                       onChange={(e) => game.onChangePreferWater(e.target.value)}></input>
            </div>

            <label>Generation:
                <select onChange={(e) => {game.onChangeRandomType(e.target.value)}}>
                    <option value={'W123'} selected>123W&1C in row</option>
                    <option value={'W12C1'}>12W&1C in row</option>
                    <option value={'W12'}>12W in row</option>
                    <option value={'W1C1'}>1W&1C in row</option>
                </select>
            </label>

        </div>
    )
}
export default Param
