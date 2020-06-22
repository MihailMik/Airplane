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
const PRIZE_TEA = 2
const PRIZE_COFFEE = 4
const PlayOne = () => {
    switch (stat.strategy) {
        case '1T': return Strategy_1T ();
        case '1C': return Strategy_1C ();
        case 'Strat2': return Strategy_Strat2 ();
        default: return 0;
    }
}
const Strategy_1T = () => {
    let prize = 0
    for (let row = 0; row < NROW; row++) {
        let seats = mix(ONE_ROW)
        const [one, two] = [...seats]
        if (one === T) {
            prize += PRIZE_TEA
            if (two === C) prize += PRIZE_COFFEE
            else if (two === W) prize = 0
        } else if (one === C) {
            if (two === T) prize += PRIZE_TEA
            else if (two === W) prize = 0
        } else {
            prize = 0
        }
    }
    return prize
}
const Strategy_1C = () => {
    let prize = 0
    for (let row = 0; row < NROW; row++) {
        let seats = mix(ONE_ROW)
        const [one, two] = [...seats]
        if (one === C) {
            prize += PRIZE_COFFEE
            if (two === T) prize += PRIZE_TEA
            else if (two === W) prize = 0
        } else if (one === T) {
            if (two === C) prize += PRIZE_COFFEE
            else if (two === W) prize = 0
        } else {
            prize = 0
        }
    }
    return prize
}

const Strategy_Strat2 = () => {
    let prize = 0
    for (let row = 0; row < NROW; row++) {
        let seats = mix(ONE_ROW)
        const [one, two, three] = [...seats]

        if (one === T) {
            prize += PRIZE_TEA
            if (two === C) prize += PRIZE_COFFEE
            else if (two === T) {
                prize += 0
                if (prize <= PRIZE_COFFEE) {
                    if (three === C) prize += PRIZE_COFFEE
                    else prize = 0
                }
            }
            else prize = 0
        } else if (one === C) {
            prize += 0
            if (two === T) {
                prize += PRIZE_TEA
                if (prize <= PRIZE_TEA) {
                    if (three === T) prize += PRIZE_TEA
                    else prize = 0
                }
            }
            else  prize = 0
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
    strategy: 'Strat2',
    timerId: undefined,
    stopTimer: () => {
        if (stat.timerId !== undefined)
            clearInterval(stat.timerId)
        stat.timerId = undefined
    },
    newStrategy: (strategy) => {
      stat.clear ()
      stat.strategy = strategy
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
    let totalPrzs = stat.gist.reduce((x,y,i)=>x+y*i*2, 0)
    // let totalPercent = stat.gist.reduce((x,y,i)=>x+y/(stat.count||1)*100, 0)
    let average = totalPrzs/(stat.count || 1)
    const MakeAll = () => {
        const MakeRow = (row) => {
            const PX_FOR_ONE_GAME = 1

            //ищем змаксимальное значение в массиве без учета элемента с индексом 0
            let [, ...normaArr] = [...stat.gist]
            const norma = Math.max (...normaArr)

            let maxWidth = window.innerWidth - 480
            let coeff = PX_FOR_ONE_GAME
            if (norma * PX_FOR_ONE_GAME > maxWidth) {
                coeff = (maxWidth - 20) / norma
            }
            let value = stat.gist[row]
            let valuePrz = value*row*2
            let width = Math.min(maxWidth, value * coeff)

            let percent = value/(stat.count||1)*100
            let percentPrz = valuePrz/(totalPrzs||1)*100

            return (
                <div key={row}>
                    <button className={s.buttonPrize}>{row * 2}</button>
                    <button className={s.buttonGames}>{value}</button>
                    <button className={s.buttonGames}>{percent.toLocaleString("ru-RU",{minimumFractionDigits:5, maximumFractionDigits:5})} %</button>
                    <button className={s.buttonGames}>{valuePrz}</button>
                    <button className={s.buttonGames}>{percentPrz.toLocaleString("ru-RU",{minimumFractionDigits:5, maximumFractionDigits:5})} %</button>
                    {width > 0 ?
                        <button className={s.buttonGist} style={{width: width}}/> : null
                    }
                </div>
            )
        }

        let rows = []
        rows.push(<div key={'title'}>
            <button className={s.butPrize}>Prz</button>
            <button className={s.butGames}>Games</button>
            <button className={s.butGames}>% games</button>
            <button className={s.butGames}>Przs</button>
            <button className={s.butGames}>% Przs</button>
        </div>)

        for (let row = 0; row < NPRIZES; row++) {
            rows.push(MakeRow(row))
        }
        return rows;
    }

    let text = stat.start ? 'Перестать играть' : 'Играть серии непрерывно'

    return (
        <div className={s.main}>
            <div className={s.Select}>
                <label>Strategy:
                    <select className={s.select} onChange={(e) => {
                        stat.newStrategy (e.target.value)
                        game.rerender()
                    }}>
                        <option value={'1T'} selected={stat.strategy==='1T'}>1T</option>
                        <option value={'1C'} selected={stat.strategy==='1C'}>1C</option>
                        <option value={'Strat2'} selected={stat.strategy==='Strat2'}>Str2</option>
                    </select>
                </label>
            </div>
            <div>
                <button className={s.toMainGame} onClick={() => {
                    props.game.prizeCoffeeStr = props.game.prizeTeaCoffeeStr * 4;
                    props.game.prizeCoffee = props.game.prizeTeaCoffeeStr * 4;
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
                <button className={s.clear} onClick={() => {
                    stat.clear()
                    props.game.rerender()
                }}>Очистить статистику
                </button>
            </div>

            <div>
                {MakeAll()}
            </div>

            <button className={s.butPrize} >Total:</button>
            <button className={s.butGames}>{stat.count}</button>
            <button className={s.butGames}>100 %</button>
            <button className={s.butGames}>{totalPrzs}</button>
            <button className={s.butGames}>100 %</button>


            <div>
            <span className={s.total}>Total Games: {stat.count.toLocaleString("ru-RU",{useGrouping:true})}</span>
            </div>
            <div>
                <span className={s.total}>Total Przes: {totalPrzs.toLocaleString("ru-RU",{useGrouping:true})}</span>
            </div>
            <div>
                <span className={s.total}>Average Prz: {average.toLocaleString("ru-RU",{minimumFractionDigits:6, maximumFractionDigits:6})}</span>
            </div>
        </div>
    )
}
