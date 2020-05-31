import React from "react"
import s from './startAndEnd.module.css';

const StartAndEnd = (props) => {
    let game = props.game

    return (

        <div className={s.startGame}>
            {/*Button "New Game"*/}
            <button className={s.buttonNewGame}
                    onClick={() => {
                        game.onClickNewGame()
                    }}>
                New Game
            </button>

            {/*Button "End Game" or "Check Game*/}
            <button className={s.buttonEndGame}
                    onClick={() => {
                        !game.gameEnded ? game.onClickEndGame() : game.onClickHint()
                    }}>
                {(!game.gameEnded) ? 'End Game' :
                (game.hintChecked) ? 'Game History' : 'Check Game'}
            </button>
        </div>
    )
}
export default StartAndEnd
