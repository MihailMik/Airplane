import React, {useEffect, useState} from "react"
import s from './randomStat.module.css';

export default props => {
    const NPRIZES = 36/2 + 1;
    const T = 0
    const C = 1
    const W = 2
    const ONE_ROW = [W,C,T,T]
    const nRow = 6
    const NinSERIES = 100


    const [start, setStart] = useState(false);
    const [stat, setStat] = useState(()=> {
        let stat = []
        for (let i = 0; i < NPRIZES; i++)
            stat[i] = 0;
        return {count:0, gist:stat}
    });

    const mix = arr => {
        let nCol = arr.length
        let tmp = [...arr]
        let out = []
        for (let i = 0; i < nCol; i++) {
            let ind = Math.floor(Math.random() * (nCol - i))
            out[i] = tmp[ind]
            tmp.splice(ind, 1)          //delete element from array
        }
        return out
    }

    const PlayOne = () => {
        let prize = 0
        for (let row = 0; row < nRow; row++) {
            let seats = mix (ONE_ROW)
            const [one, two] = [...seats]
            if (one === T) {
                if (two === C) prize += 6
                else if (two === W) prize = 0
            }
            else if (one === C) {
                if (two === T) prize += 2
                else if (two === W) prize = 0
            }
            else {
                prize = 0
            }
        }
        return prize
    }
    const Play = () => {
        let statCopy = {...stat}
        for (let i = 0; i < NinSERIES; i++) {
            statCopy.gist[PlayOne()/2]++
        }
        statCopy.count += NinSERIES
        setStat (statCopy)
    }

    useEffect(()=> {
        if (start) {
            Play ()
        }}
        , [start, stat]
    )

    const MakeAll = () => {
        const MakeRow = (row) => {
            let maxWidth = window.innerWidth - 180
            let value = stat.gist[row]
            let width = value*10
            if (width > maxWidth) width = maxWidth
            return (
                <div key={row}>
                    <button className={s.buttonPrize}>{row*2}</button>
                    <button className={s.buttonStat}>{value}</button>
                    <button className={s.buttonGist} style={{width: width}}></button>
                </div>
            )
        }

        let rows = []
        for (let row = 0; row < NPRIZES; row++)
        {
            rows.push (MakeRow (row))
        }
        return rows;
    }

    return (
        // <div className={s.main}>
        <div>
            <div>
                <div>
                    <button onClick={() => {
                        setStart(false)
                        props.game.prizeCoffeeStr = props.game.prizeTeaCoffeeStr * 4;
                        props.game.rerender()
                    }}>
                        Вернуться в главную игру
                    </button>
                </div>

                <div>
                    <button onClick={() => {
                        setStart (!start)
                    }}>
                        {start ? 'Stop':'Start'}
                    </button>
                </div>

                <div>
                <button onClick={() => {
                    Play ()
                }}>
                    Толкни!

                </button>
                </div>

                <div>
                    Count: {stat.count}
                </div>
            </div>

            <div>
                {MakeAll()}
            </div>

        </div>
    )
}
