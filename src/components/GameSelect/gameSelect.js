import s from './gameSelect.module.css'
import React from "react";

const GameSelect = (props) => {
    return (
        <div>
            <div>
                <label>Opt:</label>
                <select value={props.game.gameSelected} onChange={(e) => props.game.onChangeGameSelect(e.target.value)}>
                    <option value={'6x4W1C1'}>6x4, 1W&1C in row</option>
                    <option value={'9x5W1C1'}>9x5, 1W&1C in row</option>
                    <option value={'12x6W1C1'}>12x6, 1W&1C in row</option>
                    <option value={'param'}>arbitrary params</option>
                </select>

                <input className={s.Fee} type="radio" value='Fee0' checked={props.game.feeType === 'Fee0'}
                       onChange={(e) => props.game.onClickFee(e.target.value)}></input>
                <label>Fee0</label>


                <input  className={s.Fee}type="radio" value='Min' checked={props.game.feeType === 'Min'}
                       onChange={(e) => props.game.onClickFee(e.target.value)}></input>
                <label>Min</label>

                <input className={s.Fee} type="radio" value='Max' checked={props.game.feeType === 'Max'}
                       onChange={(e) => props.game.onClickFee(e.target.value)}></input>
                <label>Max</label>
            </div>

            <div style={{position:"relative"}}>
                {/*Призы*/}
                <label className={s.paramTitle}>Prz</label>
                <label className={s.paramName}>Tea/Co:{props.game.prizeTeaCoffeeStr} Tea:{props.game.prizeTeaStr} Co:{props.game.prizeCoffeeStr}</label>

                {/*Подсказка*/}
                {/*<div className={props.game.gameEnded ? s.empty:s.Right}>*/}
                {/*<span className={props.game.gameEnded ? s.empty : s.Right}>*/}
                <span hidden={props.game.gameEnded}>
                        <input  className={s.Fee} type="checkbox" checked={props.game.hintChecked}
                               onChange={() => props.game.onClickHint()}></input>
                    <label>Hint</label>
                </span>

                <button className={s.Stat} onClick={() => {props.game.isStatistic = true; props.game.rerender()}}>Stat</button>
            </div>
        </div>
    )
}

export default GameSelect