import React, {useEffect, useState} from 'react';
import s from "../App.module.css";
import StartAndEnd from "./Pult/startAndEnd";
import Result from "./Result/result";
import Cabin from "./Cabin/cabin";
import Pult from "./Pult/Pult";
import Secret from "./secret/secret";
import Param from "./Param/Param";

export const GameComponent = (props) => {
    const {Game, GameParam, haveParamComponent} = props;

/*
    const [superGame, setSuperGame] = useState({});
    // монтирование
    useEffect(() => {
        console.log("init game");
        setSuperGame(Game.initialize(GameParam));
    }, [props, Game, GameParam]);
    console.log("use ",superGame);
*/

    const paramComponent = (haveParamComponent !== undefined) ? <Param game={Game}/> : <div/>
    return (
        <div className={s.GameField}>
            {paramComponent}
            <StartAndEnd game={Game}/>
            <Result game={Game}/>
            <Cabin game={Game}/>
            <Pult game={Game}/>
            <Secret game={Game}/>
        </div>
    );
};