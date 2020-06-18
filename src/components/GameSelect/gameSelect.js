import s from './gameSelect.module.css'
import React from "react";

const GameSelect = (props) => {
    return (
        <div>
            <div className={s.Row}>
                <div className={s.Select}>
                    <label>Opt:
                        <select className={s.select} onChange={(e) => props.game.onChangeGameSelect(e.target.value)}>
                            <option value={'9x6W123C1'}>9x6, 123W&1C in row</option>
                            <option value={'9x6W12C1'}>9x6, 12W&1C in row</option>
                            <option value={'9x5W123C1'}>9x5, 123W&1C in row</option>
                            <option value={'6x4W1C1'}>6x4, 1W&1C in row</option>
                            <option value={'9x5W1C1'}>9x5, 1W&1C in row</option>
                            <option value={'12x6W1C1'} selected>12x6, 1W&1C in row</option>
                            <option value={'param'}>arbitrary params</option>
                        </select>
                    </label>
                </div>
                <div className={s.Right}>

                        <input type="radio" value='Fee0' checked={props.game.feeType==='Fee0'}
                               onChange={(e) => props.game.onClickFee(e.target.value)}></input>
                    <label className={s.Fee}>Fee0</label>

                        <input type="radio" value='Fee1'  checked={props.game.feeType==='Fee1'}
                               onChange={(e) => props.game.onClickFee(e.target.value)}></input>
                    <label className={s.Fee}>Fee1</label>


                        <input type="radio" value='Fee2'  checked={props.game.feeType==='Fee2'}
                               onChange={(e) => props.game.onClickFee(e.target.value)}>
                        </input>
                    <label className={s.Fee}>Fee2</label>

                </div>
            </div>
            <div className={s.Row}>
                {/*Призы*/}
                <div className={s.Left}>
                    <label className={s.paramTitle}>Prize</label>

                    <label className={s.paramName}>Tea:2 Tea/Coffee:1</label>

                    <label className={s.paramName}>Coffee:</label>
                    <input className={s.paramValue} value={props.game.prizeCoffeeStr}
                           onChange={(e) => props.game.onChangePrizeCoffee(e.target.value)}>
                    </input>
                </div>

                {/*Подсказка*/}
                <div className={props.game.gameEnded ? s.empty:s.Right}>
                        <input  type="checkbox" checked={props.game.hintChecked}
                               onChange={() => props.game.onClickHint()}></input>
                    <label>Hint</label>
                </div>
            </div>
        </div>
    )
}

export default GameSelect