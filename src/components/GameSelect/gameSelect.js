import s from './gameSelect.module.css'
import React from "react";

const GameSelect = (props) => {
    return (
        <div className={s.select}>
            <label className={s.selectTitle}>Game:</label>
            <select onChange={ (e) => props.game.onChangeGameSelect(e.target.value)}>
                <option value={'9x6'}>9x6, 1-2-3 Water, 1 Coffee</option>
                <option value={'9x5'}>9x5, 1-2-3 Water, 1 Coffee</option>
                <option value={'6x4'}>6x4, 1-2 Water, 1:2 Coffee:Tea</option>
                <option value={'param'}>arbitrary params</option>

            </select>
        </div>
    )
}

export default GameSelect