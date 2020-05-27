import s from './gameSelect.module.css'
import React from "react";

const GameSelect = (props) => {
    return (
        <div>
            <label className={s.paramName}>Game:</label>
            <select  className={s.select} onChange={ (e) => props.game.onChangeGameSelect(e.target.value)}>
                <option value={'9x6'}>9x6, 1-2-3W and 1C in row</option>
                <option value={'9x5'}>9x5, 1-2-3W and 1C in row</option>
                <option value={'6x4'}>6x4, 1-2W in row, 5C and 9T in all</option>
                <option value={'param'}>arbitrary params</option>
            </select>

            {/*Подсказка*/}
            <span className={s.classHint}>
                <label>Hint:</label>
                <input type="checkbox" checked={props.game.hintChecked} onChange={() => props.game.onClickHint()}></input>
            </span>

            {/*Призы*/}
            <div>
                <label className={s.paramTitle}>Prize</label>
                <label className={s.paramName}>Tea:</label>
                <input className={s.paramValue} value={props.game.prizeTeaStr}
                       onChange={(e) => props.game.onChangePrizeTea(e.target.value)}></input>

                <label className={s.paramName}>Coffee:</label>
                <input className={s.paramValue} value={props.game.prizeCoffeeStr}
                       onChange={(e) => props.game.onChangePrizeCoffee(e.target.value)}></input>

                <label className={s.paramName}>Tea-Coffee:</label>
                <input className={s.paramValue} value={props.game.prizeTeaCoffeeStr}
                       onChange={(e) => props.game.onChangePrizeTeaCoffee(e.target.value)}></input>
            </div>
        </div>
    )
}

export default GameSelect