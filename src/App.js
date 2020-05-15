import React from 'react';
import './App.css';
import Cabin from "./components/Cabin/cabin";
import Param from "./components/Param/Param";
import Pult from "./components/Pult/Pult";
import Result from "./components/Result/result";

function App(props) {
    return (
        <div>
            <Param game={props.game}/>
            <Result game={props.game}/>
            <Cabin game={props.game}/>
            <Pult game = {props.game}/>
        </div>
    )
}

export default App;
