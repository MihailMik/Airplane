import React from "react"
import s from './randomStat.module.css';
import game from '../redux/store'

const T = 0
const C = 1
const W = 2
const ONE_ROW = [W, C, T, T]
const NROW = 6
const PRIZE_TC = 1
const PRIZE_TEA = 2
const PRIZE_COFFEE = 4

const makeDescription = (strings) => {
    return strings.map((item, i) => <div key={i}>{item}</div>)
}
const description = {
    '1T': [
        'Q1: T IF T -> Q2: C',
        'Q1: T IF C -> Q2: T',
    ],
    '1C': [
        'Q1: C IF C -> Q2: T',
        'Q1: C IF T -> Q2: C',
    ],
    'Strat2': [
        'Q1: T IF T -> Q2: C IF (T&Prz<=c) -> Q3: C',
        'else Next',
        'Q1: T IF C -> Q2: T IF (T&Prz<=t) -> Q3: T',
        'else Next',
    ],
    'Strat3': [
        'Q1: T IF T -> Q2: T IF (T&Prz<=c) -> Q3: C',
        'else Next',
        'Q1: T IF C -> Q2: T IF (T&Prz<=t) -> Q3: T',
        'else Next',
    ],
    'T/C': [
        'Q1: T/C IF T -> Q2: T/C IF (T&Prz<=c) -> Q3: C',
        '                           (C&Prz<=t) -> Q3: T',
        'Q1: T/C IF C -> Q2: T   IF (T&Prz<=t) -> Q3: T',
    ],
}
const realization = {
    '1T': [
        'if (one === T) {',
        '    prize += PRIZE_TEA',
        '    if (two === C) prize += PRIZE_COFFEE',
        '    else if (two === W) prize = 0',
        '} else if (one === C) {',
        '    if (two === T) prize += PRIZE_TEA',
        '    else if (two === W) prize = 0',
        '} else prize = 0',
    ],
    '1C': [
        'if (one === T) {',
        '    prize += PRIZE_TEA',
        '    if (two === C) prize += PRIZE_COFFEE',
        '    else if (two === W) prize = 0',
        '} else if (one === C) {',
        '    if (two === T) prize += PRIZE_TEA',
        '    else if (two === W) prize = 0',
        '} else prize = 0',
        ],
    'Strat2': [
        'if (one === T) {',
        '    prize += PRIZE_TEA',
        '    if (two === C) prize += PRIZE_COFFEE',
        '    else if (two === T) {',
        '        prize += 0',
        '        if (prize <= PRIZE_COFFEE) {',
        '            if (three === C) prize += PRIZE_COFFEE',
        '            else prize = 0',
        '        }',
        '    } else prize = 0',
        '} else if (one === C) {',
        '    prize += 0',
        '    if (two === T) {',
        '        prize += PRIZE_TEA',
        '        if (prize <= PRIZE_TEA) {',
        '            if (three === T) prize += PRIZE_TEA',
        '            else prize = 0',
        '        }',
        '    } else prize = 0',
        '} else prize = 0',
    ],
    'Strat3': [
        'if (one === T) {',
        '    prize += PRIZE_TEA',
        '    if (two === T) {',
        '        prize += PRIZE_TEA',
        '        if (prize <= PRIZE_COFFEE) {',
        '            if (three === C) prize += PRIZE_COFFEE',
        '            else prize = 0',
        '        }',
        '    } else if (two === C) {',
        '        prize += 0',
        '    } else prize = 0',
        '} else if (one === C) {',
        '    prize += 0',
        '    if (two === T) {',
        '        prize += PRIZE_TEA',
        '        if (prize <= PRIZE_TEA) {',
        '            if (three === T) prize += PRIZE_TEA',
        '            else prize = 0',
        '        }',
        '    } else prize = 0',
        '} else prize = 0',
    ],
    'T/C': [
        'if (one === T) {',
        '    prize += PRIZE_TC',
        '    if (two === T) {',
        '        prize += PRIZE_TC',
        '        if (prize <= PRIZE_COFFEE) {',
        '            if (three === C) prize += PRIZE_COFFEE',
        '            else prize = 0',
        '        }',
        '    } else if (two === C) {',
        '        prize += PRIZE_TC',
        '        if (prize <= PRIZE_TEA) {',
        '            if (three === T) prize += PRIZE_TEA',
        '            else prize = 0',
        '        }',
        '    } else prize = 0',
        '} else if (one === C) {',
        '    prize += PRIZE_TC',
        '    if (two === T) {',
        '        prize += PRIZE_TEA',
        '        if (prize <= (PRIZE_TEA+PRIZE_TC)) {',
        '            if (three === T) prize += PRIZE_TEA',
        '            else prize = 0',
        '        }',
        '    } else prize = 0',
        '} else prize = 0'
    ],
}
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
    switch (stat.strategy) {
        case '1T':
            return Strategy_1T();
        case '1C':
            return Strategy_1C();
        case 'Strat2':
            return Strategy_Strat2();
        case 'Strat3':
            return Strategy_Strat3();
        case 'T/C':
            return Strategy_T_C();
        default:
            return 0;
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
        } else prize = 0
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
        } else prize = 0
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
            } else prize = 0
        } else if (one === C) {
            prize += 0
            if (two === T) {
                prize += PRIZE_TEA
                if (prize <= PRIZE_TEA) {
                    if (three === T) prize += PRIZE_TEA
                    else prize = 0
                }
            } else prize = 0
        } else prize = 0
    }
    return prize
}

const Strategy_Strat3 = () => {
    let prize = 0
    for (let row = 0; row < NROW; row++) {
        let seats = mix(ONE_ROW)
        const [one, two, three] = [...seats]

        if (one === T) {
            prize += PRIZE_TEA
            if (two === T) {
                prize += PRIZE_TEA
                if (prize <= PRIZE_COFFEE) {
                    if (three === C) prize += PRIZE_COFFEE
                    else prize = 0
                }
            } else if (two === C) {
                prize += 0
            } else prize = 0
        } else if (one === C) {
            prize += 0
            if (two === T) {
                prize += PRIZE_TEA
                if (prize <= PRIZE_TEA) {
                    if (three === T) prize += PRIZE_TEA
                    else prize = 0
                }
            } else prize = 0
        } else prize = 0
    }
    return prize
}
const Strategy_T_C = () => {
    let prize = 0
    for (let row = 0; row < NROW; row++) {
        let seats = mix(ONE_ROW)
        const [one, two, three] = [...seats]
        if (one === T) {
            prize += PRIZE_TC
            if (two === T) {
                prize += PRIZE_TC
                if (prize <= PRIZE_COFFEE) {
                    if (three === C) prize += PRIZE_COFFEE
                    else prize = 0
                }
            } else if (two === C) {
                prize += PRIZE_TC
                if (prize <= PRIZE_TEA) {
                    if (three === T) prize += PRIZE_TEA
                    else prize = 0
                }
            } else prize = 0
        } else if (one === C) {
            prize += PRIZE_TC
            if (two === T) {
                prize += PRIZE_TEA
                if (prize <= (PRIZE_TEA+PRIZE_TC)) {
                    if (three === T) prize += PRIZE_TEA
                    else prize = 0
                }
            } else prize = 0
        } else prize = 0
    }
    return prize
}

export let stat = {
    start: false,
    count: 0,
    gist: [],
    nInSeries: 100,
    strategy: 'T/C', STEP: 1, NPRIZES: 36 / 1 + 1,
    timerId: undefined,
    isDescription: false,
    isRealization: false,
    stopTimer: () => {
        if (stat.timerId !== undefined)
            clearInterval(stat.timerId)
        stat.timerId = undefined
    },
    newStrategy: (strategy) => {
        stat.strategy = strategy;
        switch (strategy) {
            case 'T/C':     stat.STEP=1; stat.NPRIZES = 36/stat.STEP +1; break
            case 'Strat3':  stat.STEP=2; stat.NPRIZES = 38/stat.STEP +1; break
            default:        stat.STEP=2; stat.NPRIZES = 36/stat.STEP +1; break
        }
        stat.clear()
    },
    create: () => {
        stat.start = false
        stat.nInSeries = 100
        stat.clear();
        stat.stopTimer();
    },

    clear: () => {
        stat.count = 0
        for (let i = 0; i < stat.NPRIZES; i++)
            stat.gist[i] = 0
    },

    Play() {
        for (let i = 0; i < stat.nInSeries; i++) {
            stat.gist[PlayOne() / stat.STEP]++
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
    let totalPrzs = stat.gist.reduce((x, y, i) => x + y * i * stat.STEP, 0)
    // let totalPercent = stat.gist.reduce((x,y,i)=>x+y/(stat.count||1)*100, 0)
    let average = totalPrzs / (stat.count || 1)
    const MakeAll = () => {
        const MakeRow = (row) => {
            const PX_FOR_ONE_GAME = 1

            //ищем змаксимальное значение в массиве без учета элемента с индексом 0
            let [, ...normaArr] = [...stat.gist]
            const norma = Math.max(...normaArr)

            // let maxWidth = window.innerWidth - 390
            let maxWidth = window.innerWidth - 400
            let coeff = PX_FOR_ONE_GAME
            if (norma * PX_FOR_ONE_GAME > maxWidth) {
                coeff = (maxWidth - 20) / norma
            }
            let value = stat.gist[row]
            let valuePrz = value * row * stat.STEP
            let width = Math.min(maxWidth, value * coeff)

            let percent = value / (stat.count || 1) * 100
            let percentPrz = valuePrz / (totalPrzs || 1) * 100

            return (
                <div key={row}>
                    <button className={s.buttonPrize}>{row * stat.STEP}</button>
                    <button className={s.buttonGames}>{value}</button>
                    <button className={s.buttonGames}>{percent.toLocaleString("ru-RU", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3
                    })}</button>
                    <button className={s.buttonGames}>{valuePrz}</button>
                    <button className={s.buttonGames}>{percentPrz.toLocaleString("ru-RU", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3
                    })}</button>
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

        for (let row = 0; row < stat.NPRIZES; row++) {
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
                        stat.newStrategy(e.target.value)
                        game.rerender()
                    }}>
                        <option value={'1T'} selected={stat.strategy === '1T'}>1T</option>
                        <option value={'1C'} selected={stat.strategy === '1C'}>1C</option>
                        <option value={'Strat2'} selected={stat.strategy === 'Strat2'}>Str2</option>
                        <option value={'Strat3'} selected={stat.strategy === 'Strat3'}>Str3</option>
                        <option value={'T/C'} selected={stat.strategy === 'T/C'}>T/C</option>
                    </select>
                </label>

                <button className={s.buttonDescription} onClick={() => {
                    stat.isDescription = !stat.isDescription
                    game.rerender()
                }}>
                    {stat.isDescription ? 'Скрыть описание' : 'Показать описание'}
                </button>

                <button className={s.buttonDescription} onClick={() => {
                    stat.isRealization = !stat.isRealization
                    game.rerender()
                }}>
                    {stat.isRealization ? 'Скрыть реализацию' : 'Показать реализацию'}
                </button>

            </div>


            {stat.isDescription ?
                <div className={s.description} > {makeDescription (description[stat.strategy])} </div> :
                null
            }

            {stat.isRealization ?
                <div className={s.realization} > {makeDescription (realization[stat.strategy])} </div> :
                null
            }

            <div>
                <button className={s.toMainGame} onClick={() => {
                    props.game.prizeCoffeeStr = props.game.prizeTeaCoffeeStr * 4;
                    props.game.prizeCoffee = props.game.prizeTeaCoffeeStr * 4;
                    props.game.rerender()
                }}>Вернуться в главную игру
                </button>
            </div>

            <div className={s.seria}>
                <label>Игр в серии: </label>
                <input className={s.edit} value={stat.nInSeries}
                       onChange={(e) => {
                           stat.nInSeries = Number(e.target.value);
                           props.game.rerender()
                       }}>
                </input>
                <button className={s.play} onClick={() => {
                    stat.clear()
                    props.game.rerender()
                }}>Очистить статистику
                </button>
            </div>

            <div>
                <button className={s.play} onClick={() => {
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
                {MakeAll()}
            </div>

            <button className={s.butPrize}>Total:</button>
            <button className={s.butGames}>{stat.count}</button>
            <button className={s.butGames}>100</button>
            <button className={s.butGames}>{totalPrzs}</button>
            <button className={s.butGames}>100</button>


            <div>
                <span className={s.total}>Total Games: {stat.count.toLocaleString("ru-RU", {useGrouping: true})}</span>
            </div>
            <div>
                <span className={s.total}>Total Przes: {totalPrzs.toLocaleString("ru-RU", {useGrouping: true})}</span>
            </div>
            <div>
            <span className={s.total}>Average Prz: {average.toLocaleString("ru-RU", {
                minimumFractionDigits: 6,
                maximumFractionDigits: 6
            })}</span>
            </div>
        </div>
    )
}
