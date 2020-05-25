import React from "react"
import game from "../../redux/store";
import s from './Param.module.css';

let onClickHint = () => {
    game.onClickHint()
}
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

let onChangePrizeTea = (e) => {
    game.onChangePrizeTea(e.target.value)
}
let onChangePrizeCoffee = (e) => {
    game.onChangePrizeCoffee(e.target.value)
}
let onChangePrizeTeaCoffee = (e) => {
    game.onChangePrizeTeaCoffee(e.target.value)
}

const Param = (props) => {
    let classHint = (game.gameEnded) ? s.empty : s.classHint

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

            {/*Призы*/}
            <div>
                <label className={s.paramTitle}>Prize</label>
                    <label className={s.paramName}>Tea:</label>
                    <input className={s.paramValue} value={game.prizeTeaStr} onChange={onChangePrizeTea}></input>

                    <label className={s.paramName}>Coffee:</label>
                    <input className={s.paramValue} value={game.prizeCoffeeStr} onChange={onChangePrizeCoffee}></input>

                    <label className={s.paramName}>Tea-Coffee:</label>
                    <input className={s.paramValue} value={game.prizeTeaCoffeeStr}
                           onChange={onChangePrizeTeaCoffee}></input>
            </div>

            <label>Generation:</label>
            <select onChange={(e) => {game.onChangeRandomType (e.target.value)}}>

                <option value={'W123'} selected>1-2-3 Water & 1 Coffee</option>
                <option value={'W12'}>1.5 Water</option>
            </select>

            {/*Подсказка*/}
            <span className={classHint}>
                <label>Hint:</label>
                <input type="checkbox" checked={game.hintChecked} onChange={onClickHint}></input>
            </span>
        </div>
    )
}
export default Param
