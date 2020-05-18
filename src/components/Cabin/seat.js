import React from "react"
import s from './seat.module.css'


const Seat = (props) => {
    const game = props.game
    const row = props.row
    const col = props.col

    const ind = game.getIndex (row, col)
    const seat = game.seats[ind]
    const given = seat.given
    const served = seat.served
    const isQuestionTea = seat.isQuestionTea
    const isQuestionCoffee = seat.isQuestionCoffee
    const index = seat.index
    const nextServed = game.nextServed
    const gameEnded = game.gameEnded
    const hintChecked = game.hintChecked

    const onClickSeat = () => game.onClickSeat (ind)

    //Text in button
    let text = given
    switch (given) {
        case 'Tea': text = "T"; break
        case 'Coffee': text = "C"; break
        case 'Water': text = "W"; break
        default:text = 'err'; break
    }
    if (!hintChecked) {
        if (served) text = given
        else if (!gameEnded) text = ''
    }
    if (ind === nextServed)
        text = game.isQuestionTea ? 'Tea?' : (game.isQuestionCoffee ? 'Coffee?' : 'Te-Co?')

    //Is button enabled for clicking
    const enabled = game.isSeatEnabled (row, col)

    //BackgroundColor in dependence of answer
    let answer = s.answerNothing
    if (served) {
        if (given === 'Water') {
            answer = s.answerWater
        }
        else if ((isQuestionTea && given === 'Tea') ||
            (isQuestionCoffee && given === 'Coffee')) {
            answer = s.answerTrue
        }
        else if ((isQuestionTea && given === 'Coffee') ||
            (isQuestionCoffee && given === 'Tea')) {
            answer = s.answerFalse
        }
        else {
            answer = s.answerHalfTrue
        }
    }

    if (hintChecked || (gameEnded && !served)) {
        switch (given) {
            case 'Tea':     answer = s.Tea;     break
            case 'Coffee':  answer = s.Coffee;  break
            case 'Water':   answer = s.Water;   break
            default:text = 'err'; break
        }
    }

    let clas = answer + ' ' + s.buttonGeneral
    if (enabled) clas += ' ' + s.buttonEnabled
    if (ind === nextServed && !gameEnded) clas += ' ' + s.nextServed
    return (
        <button id = {index} disabled={!enabled} className={clas} onClick={onClickSeat}>
            {text}<br />
            {game.getSeatName (ind)}
        </button>
    )
}
export default Seat
