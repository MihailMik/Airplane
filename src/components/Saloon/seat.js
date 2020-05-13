import React from "react"
import s from './seat.module.css'
import game from "../../redux/store";


const Seat = (props) => {
    let game = props.game
    let row = props.row
    let col = props.col

    let ind = game.getIndex (row, col)
    let activeRow = game.activeRow
    let nCol = game.nCol
    let nServedInRow = game.nServedInRow

    let seat = game.seats[ind]
    let given = seat.given
    let served = seat.served
    let isQuestionTea = seat.isQuestionTea
    let isQuestionCoffee = seat.isQuestionCoffee
    let isQuestionTeaCoffee = seat.isQuestionTeaCoffee
    let index = seat.index

    let onClickSeat = () => game.onClickSeat (ind)
    //Text in button
    let text = given
    if (!game.hintChecked && !served) {
        text = game.getSeatName (ind)
    }

    //Is button enabled for clicking
    let enabled = game.isSeatEnabled (row, col)

    //BackgroundColor in dependence of answer
    let answer = s.answerNothing
    if (served) {
        if (given === 'Water') {
            answer = s.answerWater
        }
        else if (isQuestionTea && given === 'Tea' ||
            isQuestionCoffee && given === 'Coffee') {
            answer = s.answerTrue
        }
        else if (isQuestionTea && given === 'Coffee' ||
            isQuestionCoffee && given === 'Tea') {
            answer = s.answerFalse
        }
        else {
            answer = s.answerHalfTrue
        }
    }

    let clas = answer + ' ' + s.buttonGeneral
    if (enabled) clas += ' ' + s.buttonEnabled
    return (
        <button id = {index} disabled={!enabled} className={clas} onClick={onClickSeat}>
            {text}
        </button>
    )
}
export default Seat
