import React from 'react';
import s from "../App.module.css";
import StartAndEnd from "./Pult/startAndEnd";
import Result from "./Result/result";
import Cabin from "./Cabin/cabin";
import Pult from "./Pult/Pult";
import Secret from "./secret/secret";

export const GameComponent = (props) => {
    const {Game, GameParam} = props;
    Game.initialize(GameParam);

    return (
        <div className={s.GameField}>
            <StartAndEnd game={Game}/>
            <Result game={Game}/>
            <Cabin game={Game}/>
            <Pult game={Game}/>
            <Secret game={Game}/>
        </div>
    );
};