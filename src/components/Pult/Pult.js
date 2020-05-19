import React from "react"
import game from "../../redux/store";
import s from './Pult.module.css';

let onClickQuestionTea = () => game.onClickQuestionTea()
let onClickQuestionCoffee = () => game.onClickQuestionCoffee()
let onClickQuestionTeaCoffee = () => game.onClickQuestionTeaCoffee()
let onClickAsk = () => {
    if (game.nextServed !== undefined) {
        game.seatOffer(game.nextServed)
    }
}

let onClickTake = () => {
    game.onClickTake ()
}

let getAskedIndex = () => {
    //Find next served seat
    let ind = game.nSize
    while (ind) {
        if (game.seats[ind - 1].served) break
        ind--
    }
    //нет ли в последней строке необслуженных мест
    if (ind === game.nSize) {
        ind -= game.nCol
        while (ind !== game.nSize && game.seats[ind].served) ind++
    }
    return ind
}
const Pult = (props) => {
    let textAsk = ""
    let textTake = "Take Prize"

    //Find next served seat
    let ind = getAskedIndex();
    let stateButtonAsk = s.buttonAsk
    let disabledAsk = false
    if (game.nextServed === undefined) {
        stateButtonAsk = s.buttonAskDisable
        disabledAsk = true
    }
    else ind = game.nextServed

    let stateButtonTake = s.buttonTake
    let disabledTake = false
    if ((game.activeRow && game.activeRow % 3 === 0 && game.nServedInRow === 0) ||
        (game.activeRow % 3 === 2 && game.nServedInRow >= game.nCol/2) ||
        game.gameEnded) {
    } else {
        disabledTake = true;
        stateButtonTake = s.buttonTakeDisable
    }

    let ask = game.isQuestionTea ? 'Tea?' : game.isQuestionCoffee ? 'Coffee?' : 'Tea-Coffee?'

    let statePult = s.pult
    if (!game.gameEnded && ind < game.nSize) {
        if (game.nextServed !== undefined) textAsk = `Ask ${game.getSeatName(ind)}: ${ask}`
        else textAsk = `Ask X: ${ask}`
    } else {
        statePult = s.pultEmpty
    }

    let stateTea = (game.isQuestionTea ? s.buttonActive : s.buttonNonActive) + ' ' + s.buttonGeneral
    let stateCoffee = (game.isQuestionCoffee ? s.buttonActive : s.buttonNonActive) + ' ' + s.buttonGeneral
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
                <button className={stateButtonTake} onClick={onClickTake} disabled={disabledTake}>
                    {textTake}
                </button>

                <button className={stateButtonAsk} onClick={onClickAsk} disabled={disabledAsk}>
                    {textAsk}
                </button>
            </div>
        </div>
    )
}

export default Pult