import React from "react"
import game from "../../redux/store";
import s from './Param.module.css';

let onClickNewGame = () => {
    game.onClickNewGame()
}
let onClickEndGame = () => {
    if (!game.gameEnded)
        game.onClickEndGame()
    else
        game.onClickHint()
}
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
    let classHint = s.classHint
    let textGame = 'End Game'
    if (game.gameEnded) {
        classHint = s.empty

        if (game.hintChecked){
            textGame = 'Game History'
        }
        else {
            textGame = 'Check Game'
        }
    }

    return (
        <div>
            {/*Салон*/}
            <div>
                <text className={s.paramTitle}>Cabin</text>
                <div>
                    <text className={s.paramName}>Rows:</text>
                    <input className={s.paramValue} value={game.nRowStr} onChange={onChangeRow}></input>

                    <text className={s.paramName}>Seats in row:</text>
                    <input className={s.paramValue} value={game.nColStr} onChange={onChangeCol}></input>
                </div>
            </div>

            {/*Предпочтения*/}
            <div>
                <text className={s.paramTitle}>Answers</text>
                <div>
                    <text className={s.paramName}>Tea:</text>
                    <input className={s.paramValue} value={game.nPreferTeaStr} onChange={onChangePreferTea}></input>

                    <text className={s.paramName}>Coffee:</text>
                    <input className={s.paramValue} value={game.nPreferCoffeeStr}
                           onChange={onChangePreferCoffee}></input>

                    <text className={s.paramName}>Water:</text>
                    <input className={s.paramValue} value={game.nPreferWaterStr} onChange={onChangePreferWater}></input>
                </div>
            </div>

            {/*Призы*/}
            <div>
                <text className={s.paramTitle}>Prize</text>
                <div>
                    <text className={s.paramName}>Tea:</text>
                    <input className={s.paramValue} value={game.prizeTeaStr} onChange={onChangePrizeTea}></input>

                    <text className={s.paramName}>Coffee:</text>
                    <input className={s.paramValue} value={game.prizeCoffeeStr} onChange={onChangePrizeCoffee}></input>

                    <text className={s.paramName}>Tea-Coffee:</text>
                    <input className={s.paramValue} value={game.prizeTeaCoffeeStr}
                           onChange={onChangePrizeTeaCoffee}></input>
                </div>
            </div>

            {/*Кнопка старта игры*/}
            <div className={s.startGame}>
                <button className={s.buttonNewGame} onClick={onClickNewGame}>New Game</button>
                <button className={s.buttonEndGame} onClick={onClickEndGame}>{textGame}</button>

                {/*Подсказка*/}
                <div className={classHint}>
                    <text>Hint:</text>
                    <input type="checkbox" checked={game.hintChecked} onClick={onClickHint}></input>
                </div>
            </div>
        </div>
    )
}
export default Param
