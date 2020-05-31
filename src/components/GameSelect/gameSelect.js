import s from './gameSelect.module.css'
import React from "react";
import game from "../../redux/store";

const GameSelect = (props) => {
    let classHint = (game.gameEnded) ? s.empty : s.classHint

    return (
        <div>
            <label className={s.paramName}>Game:
                <select className={s.select} onChange={(e) => props.game.onChangeGameSelect(e.target.value)}>
                    <option value={'9x6W123C1'} selected>9x6, 123W&1C in row</option>
                    <option value={'9x6W12C1'}>9x6, 12W&1C in row</option>
                    <option value={'9x5W123C1'}>9x5, 123W&1C in row</option>
                    {/*<option value={'6x4W12'}>6x4, 12W in row, 5C&10T in all</option>*/}
                    <option value={'6x4W1C1'}>6x4, 1W&1C in row</option>
                    <option value={'9x5W1C1'}>9x5, 1W&1C in row</option>
                    <option value={'12x6W1C1'}>12x6, 1W&1C in row</option>
                    <option value={'param'}>arbitrary params</option>
                </select>
            </label>

            {/*Штраф*/}
            <span className={s.classFee}>
                <label>Fee:
                <input type="checkbox" checked={props.game.feeChecked}
                       onChange={() => props.game.onClickFee()}></input>
                    </label>
            </span>

            {/*Подсказка*/}
            <span className={classHint}>
                <label>Hint:
                <input type="checkbox" checked={props.game.hintChecked}
                       onChange={() => props.game.onClickHint()}></input>
                    </label>
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