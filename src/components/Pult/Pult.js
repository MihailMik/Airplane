import React from "react"
import game from "../../redux/store";
import s from './Pult.module.css';

let onClickQuestionTea       = () => game.onClickQuestionTea ()
let onClickQuestionCoffee    = () => game.onClickQuestionCoffee ()
let onClickQuestionTeaCoffee = () => game.onClickQuestionTeaCoffee ()
let onClickAsk = () =>
{
    if (game.nextServed !== undefined) {
        game.seatOffer (game.nextServed)
    }
}

let getAskedIndex = () => {
    //Find next served seat
    let ind = game.nSize
    while (ind)
    {
        if (game.seats[ind-1].served) break
        ind--
    }
    //нет ли в последней строке необслуженных мест
    if (ind === game.nSize) {
        ind -= game.nCol
        while (ind !== game.nSize  && game.seats[ind].served) ind++
    }
    return ind
}
const Pult = (props) => {
    let textAsk = ""

    //Find next served seat
    let ind = getAskedIndex ();
    let stateButtonAsk = s.buttonAsk
    if (game.nextServed === undefined) stateButtonAsk = s.pultEmpty
    else ind =  game.nextServed

    let ask = game.isQuestionTea ? 'Tea?' : game.isQuestionCoffee ? 'Coffee?' : 'Tea-Coffee?'

    let statePult = s.pult
    if (!game.gameEnded &&  ind < game.nSize) {
        textAsk = `Ask ${game.getSeatName(ind)}: ${ask}`
    }
    else {
        statePult = s.pultEmpty
    }

    let stateTea       = (game.isQuestionTea       ? s.buttonActive : s.buttonNonActive) + ' ' + s.buttonGeneral
    let stateCoffee    = (game.isQuestionCoffee    ? s.buttonActive : s.buttonNonActive) + ' ' + s.buttonGeneral
    let stateTeaCoffee = (game.isQuestionTeaCoffee ? s.buttonActive : s.buttonNonActive) + ' ' + s.buttonGeneral
    return (
        <div className={statePult}>
            <div>
            <button className={stateTea} onClick={onClickQuestionTea}>
                Tea?
            </button>

            <button className={stateCoffee} onClick={onClickQuestionCoffee}>
                Coffee?
            </button>

            <button className={stateTeaCoffee} onClick={onClickQuestionTeaCoffee}>
                Tea-Coffee?
            </button>
            </div>

            <div>
                <button className={stateButtonAsk} onClick={onClickAsk}>
                    {textAsk}
                </button>
            </div>
        </div>
    )
}

export default Pult