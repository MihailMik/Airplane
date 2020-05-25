import React from 'react';
import Cabin from "./components/Cabin/cabin";
import Param from "./components/Param/Param";
import Pult from "./components/Pult/Pult";
import Result from "./components/Result/result";
import Secret from "./components/secret/secret";
import s from './App.module.css';
import './css/airplane.css';
import {Route} from "react-router-dom";
import StartAndEnd from "./components/Pult/startAndEnd";
import ParamDefault from "./components/Param/paramDefault";

// const dial = '/#1/abc'
function App(props) {
    return (
        <div className={s.GameField}>

            <Route path='/param' render={() => <Param game={props.game}/>}/>
            <Route path='/9x6' render={() => <ParamDefault game={props.game}/>}/>
            <Route path='/9x5' render={() => <ParamDefault game={props.game}/>}/>
            <Route path='/6x4' render={() => <ParamDefault game={props.game}/>}/>
            <Route path='/' render={() => <ParamDefault game={props.game}/>}/>

            <StartAndEnd game={props.game}/>

            <Result game={props.game}/>
            <Cabin game={props.game}/>
            <Pult game = {props.game}/>
            <Secret game = {props.game}/>
        </div>
    )
}

export default App;
