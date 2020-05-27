import React from "react"
import s from './Param.module.css';

const Param = (props) => {
    let game = props.game
    let [disabledT, disabledC, disabledW] = (game.randomType === 'W12') ? [true, false, true] : [true, true, true]
    return (
        <div>
            {/*Салон*/}
            <div>
                <div>
                    <label className={s.paramTitle}>Cabin</label>
                    <label className={s.paramName}>Rows:</label>
                    <input className={s.paramValue} value={game.nRowStr}
                           on
                           onChange={(e) => game.onChangeRow(e.target.value)}></input>

                    <label className={s.paramName}>Seats in row:</label>
                    <input className={s.paramValue} value={game.nColStr}
                           onChange={(e) => game.onChangeCol(e.target.value)}></input>
                </div>
            </div>

            {/*Предпочтения*/}
            <div>
                <div>
                    <label className={s.paramTitle}>Answers</label>
                    <label className={s.paramName}>Tea:</label>
                    <input className={s.paramValue} value={game.nPreferTeaStr}  disabled={disabledT}
                           onChange={(e) => game.onChangePreferTea(e.target.value)}></input>

                    <label className={s.paramName}>Coffee:</label>
                    <input className={s.paramValue} value={game.nPreferCoffeeStr} disabled={disabledC}
                           onChange={(e) => game.onChangePreferCoffee(e.target.value)}></input>

                    <label className={s.paramName}>Water:</label>
                    <input className={s.paramValue} value={game.nPreferWaterStr} disabled={disabledW}
                           onChange={(e) => game.onChangePreferWater(e.target.value)}></input>
                </div>
            </div>

            <label>Generation:</label>
            <select onChange={(e) => {game.onChangeRandomType (e.target.value)}}>

                <option value={'W123'} selected>1-2-3W & 1C in row</option>
                <option value={'W12C1'} selected>1-2W & 1C in row</option>
                <option value={'W12'}>1-2W</option>
            </select>

        </div>
    )
}
export default Param
