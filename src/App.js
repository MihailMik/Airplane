import React from 'react';
import Cabin from "./components/Cabin/cabin";
import Param from "./components/Param/Param";
import Pult from "./components/Pult/Pult";
import Result from "./components/Result/result";
import Secret from "./components/secret/secret";
import s from './App.module.css';

function App(props) {
    return (
        <div className={s.GameField}>
            <Param game={props.game}/>
            <Result game={props.game}/>
            <Cabin game={props.game}/>
            <Pult game = {props.game}/>
            <Secret game = {props.game}/>
        </div>
    )
}

export default App;
