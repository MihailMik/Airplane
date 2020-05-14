import React from "react"
import s from './result.module.css';

const Result = (props) => {
    let text = `Prize: ${props.game.prize}`
    return (
        <div className={s.forma}>
            <text className={s.text}>{text}</text>
        </div>
    )
}
export default Result
