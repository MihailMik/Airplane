import React from "react"
import game from "../../redux/store";
import s from './Param.module.css';

let onChangeRow = (e) => {
    game.onChangeRow(e.target.value)
}
let onChangeCol = (e) => {
    game.onChangeCol(e.target.value)
}

let onChangePreferTea = (e) => {
    game.onChangePreferTea(e.target.value)
}
let onChangePreferCoffee = (e) => {
    game.onChangePreferCoffee(e.target.value)
}
let onChangePreferWater = (e) => {
    game.onChangePreferWater(e.target.value)
}

const Param = (props) => {
    return (
        <div>
            {/*Салон*/}
            <div>
                <div>
                    <label className={s.paramTitle}>Cabin</label>
                    <label className={s.paramName}>Rows:</label>
                    <input className={s.paramValue} value={game.nRowStr} onChange={onChangeRow}></input>

                    <label className={s.paramName}>Seats in row:</label>
                    <input className={s.paramValue} value={game.nColStr} onChange={onChangeCol}></input>
                </div>
            </div>

            {/*Предпочтения*/}
            <div>
                <div>
                    <label className={s.paramTitle}>Answers</label>
                    <label className={s.paramName}>Tea:</label>
                    <input className={s.paramValue} value={game.nPreferTeaStr} onChange={onChangePreferTea}></input>

                    <label className={s.paramName}>Coffee:</label>
                    <input className={s.paramValue} value={game.nPreferCoffeeStr}
                           onChange={onChangePreferCoffee}></input>

                    <label className={s.paramName}>Water:</label>
                    <input className={s.paramValue} value={game.nPreferWaterStr} onChange={onChangePreferWater}></input>
                </div>
            </div>

            <label>Generation:</label>
            <select onChange={(e) => {game.onChangeRandomType (e.target.value)}}>

                <option value={'W123'} selected>1-2-3 Water & 1 Coffee</option>
                <option value={'W12'}>1.5 Water</option>
            </select>

        </div>
    )
}
export default Param
