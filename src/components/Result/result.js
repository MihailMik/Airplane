import React from "react"
import game from "../../redux/store";
import s from './result.module.css';

const Result = (props) => {
    let text = `Your result: ${props.game.prize}`
    return (
        <div className={s.forma}>
            <text className={s.text}>{text}</text>
        </div>
    )
}
export default Result
