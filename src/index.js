import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import game from "./redux/store";
import {stat} from "./RandomStat/randomStat";

const rerender = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App game={game}/>
        </React.StrictMode>,
        document.getElementById('root')
    );

}

game.create(rerender);
stat.create();
rerender();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
