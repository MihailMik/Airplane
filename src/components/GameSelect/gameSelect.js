import s from './gameSelect.module.css'
import React from "react";

const GameSelect = (props) => {
    return (
        <div>
            <div>
                <label>Opt:</label>
                <select onChange={(e) => props.game.onChangeGameSelect(e.target.value)}>
                    {/*<option value={'9x6W123C1'}>9x6, 123W&1C in row</option>*/}
                    {/*<option value={'9x6W12C1'}>9x6, 12W&1C in row</option>*/}
                    {/*<option value={'9x5W123C1'}>9x5, 123W&1C in row</option>*/}
                    <option value={'6x4W1C1'} selected>6x4, 1W&1C in row</option>
                    <option value={'9x5W1C1'}>9x5, 1W&1C in row</option>
                    <option value={'12x6W1C1'}>12x6, 1W&1C in row</option>
                    <option value={'param'}>arbitrary params</option>
                </select>

                <input className={s.Fee} type="radio" value='Fee0' checked={props.game.feeType === 'Fee0'}
                       onChange={(e) => props.game.onClickFee(e.target.value)}></input>
                <label>Fee0</label>

                <input className={s.Fee} type="radio" value='Fee1' checked={props.game.feeType === 'Fee1'}
                       onChange={(e) => props.game.onClickFee(e.target.value)}></input>
                <label>Fee1</label>


                <input  className={s.Fee}type="radio" value='Mix' checked={props.game.feeType === 'Mix'}
                       onChange={(e) => props.game.onClickFee(e.target.value)}>
                </input>
                <label>Mix</label>
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