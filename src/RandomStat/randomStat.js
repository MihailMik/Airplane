import React from "react"
import s from './randomStat.module.css';
import game from '../redux/store'

const NPRIZES = 36 / 2 + 1;
const T = 0
const C = 1
const W = 2
const ONE_ROW = [W, C, T, T]
const NROW = 6

const mix = (arr) => {
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
    for (let row = 0; row < NROW; row++) {
        let seats = mix(ONE_ROW)
        const [one, two] = [...seats]
        if (one === T) {
            if (two === C) prize += 6
            else if (two === W) prize = 0
        } else if (one === C) {
            if (two === T) prize += 2
            else if (two === W) prize = 0
        } else {
            prize = 0
        }
    }
    return prize
}

export let stat = {
    start: false,
    count: 0,
    gist: [],
    nInSeries: 100,
    timerId: undefined,
    stopTimer: () => {
        if (stat.timerId !== undefined)
            clearInterval(stat.timerId)
        stat.timerId = undefined
    },
    create: () => {
        stat.start = false
        stat.count = 0
        stat.nInSeries = 100
        for (let i = 0; i < NPRIZES; i++)
            stat.gist[i] = 0
        stat.stopTimer();
    },

    clear: () => {
        stat.count = 0
        for (let i = 0; i < NPRIZES; i++)
            stat.gist[i] = 0
    },

    Play() {
        for (let i = 0; i < stat.nInSeries; i++) {
            stat.gist[PlayOne() / 2]++
        }
        stat.count += stat.nInSeries
    },

    handleInterval() {
        if (stat.timerId === undefined) return
        stat.Play();
        game.rerender()
    }
}

export default props => {
    const MakeAll = () => {
        const MakeRow = (row) => {
            const PX_FOR_ONE_GAME = 1
            const PRIZE_NORMA = 6 / 2

            let maxWidth = window.innerWidth - 180
            let coeff = PX_FOR_ONE_GAME
            if (stat.gist[PRIZE_NORMA] * PX_FOR_ONE_GAME > maxWidth) {
                coeff = (maxWidth - 20) / stat.gist[PRIZE_NORMA]
            }
            let value = stat.gist[row]
            let width = Math.min(maxWidth, value * coeff)

            return (
                <div key={row}>
                    <button className={s.buttonPrize}>{row * 2}</button>
                    <button className={s.buttonStat}>{value}</button>
                    {value > 0 ?
                        <button className={s.buttonGist} style={{width: width}}/> : null
                    }
                </div>
            )
        }

        let rows = []
        for (let row = 0; row < NPRIZES; row++) {
            rows.push(MakeRow(row))
        }
        return rows;
    }
    let text = stat.start ? 'Перестать играть' : 'Играть серии непрерывно'

    return (
        // <div className={s.main}>
        <div>
            <div>
                <div>
                    <button className={s.toMainGame} onClick={() => {
                        props.game.prizeCoffeeStr = props.game.prizeTeaCoffeeStr * 4;
                        props.game.rerender()
                    }}>Вернуться в главную игру
                    </button>
                </div>

                <div className={s.seria}>
                    <label>Длина серии (игр): </label>
                    <input className={s.edit} value={stat.nInSeries}
                           onChange={(e) => {
                               stat.nInSeries = Number(e.target.value);
                               props.game.rerender()
                           }}>
                    </input>
                </div>

                <div>
                    <button className={s.playing} onClick={() => {
                        stat.stopTimer()
                        stat.start = !stat.start;
                        if (stat.start) {
                            stat.timerId = setInterval(stat.handleInterval, 10);
                            stat.Play();
                        }

                        props.game.rerender()
                    }}>
                        {text}
                    </button>

                    <button className={s.play} disabled={stat.start} onClick={() => {
                        stat.Play()
                        props.game.rerender()
                    }}>
                        Сыграть одну серию
                    </button>
                </div>

                <div>
                    <span className={s.count}>
                        Count: {stat.count}
                        </span>
                    <button className={s.clear} onClick={() => {
                        stat.clear()
                        props.game.rerender()
                    }}>Очистить статистику
                    </button>
                </div>


            </div>

            <div>
                {MakeAll()}
            </div>

        </div>
    )
}
