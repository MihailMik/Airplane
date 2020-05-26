import React from 'react';
import './css/airplane.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import {constData6x4, constData9x5, constData9x6} from "./redux/store";
import {GameComponent} from "./components/Game";

// const dial = '/#1/abc'
const App = (props) => (
    <HashRouter>
        <Switch>
            <Route path='/param' render={() => <GameComponent GameParam={constData9x6} Game={props.game}/>}/>
            <Route path='/9x6' render={() => <GameComponent GameParam={constData9x6} Game={props.game}/>}/>
            <Route path='/9x5' render={() => <GameComponent GameParam={constData9x5} Game={props.game}/>}/>
            <Route path='/6x4' render={() => <GameComponent GameParam={constData6x4} Game={props.game}/>}/>
            <Route exact path='/' render={() => <GameComponent GameParam={constData9x6} Game={props.game}/>}/>
        </Switch>
    </HashRouter>
);

export default App;
