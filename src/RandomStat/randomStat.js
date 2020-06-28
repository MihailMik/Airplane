import React from "react"
import s from './randomStat.module.css';
import game from '../redux/store'

const NPRIZES_MAX = 200 //максимально возможный приз в игре, оценка сверху
const T = 0
const C = 1
const W = 2

let NROW, NCOL
let FEE_TEA, FEE_COFFEE
let PRIZE_TC, PRIZE_TEA, PRIZE_COFFEE
let strategyProg

const setParamFromGame = () => {
    switch (game.feeType) {
        case 'Fee0':
            FEE_TEA = 0;
            FEE_COFFEE = 0;
            break
        case 'Max':
            FEE_TEA = game.prizeTea;
            FEE_COFFEE = game.prizeCoffee;
            break
        case 'Min':
        default:
            FEE_TEA = game.prizeTeaCoffee;
            FEE_COFFEE = game.prizeTeaCoffee;
            break
    }
    PRIZE_TEA = game.prizeTea
    PRIZE_COFFEE = game.prizeCoffee
    PRIZE_TC = game.prizeTeaCoffee
    NCOL = game.nCol
    NROW = game.nRow
}

/*
const randomRow = (arr) => {
    let nCol = arr.length
    let tmp = [...arr]
    let out = []
    for (let i = 0; i < nCol; i++) {
        let ind = Math.floor(Math.random() * (nCol - i))
        out[i] = tmp.splice(ind, 1)[0]
    }
    return out
}
*/
const randomRow = (nCol) => {
    let i0, i1

    i0 = Math.floor (Math.random ()*nCol)
    do {i1 = Math.floor (Math.random ()*nCol)} while (i1 === i0);

    let out = []
    for (let i = 0; i < nCol; i++)
        out.push (T)
    out[i0] = W
    out[i1] = C

    return out
}
const randomSeats = (arr) => {
    let i0, i1, i2, i3

    let len = arr.length
    i0 = Math.floor (Math.random ()*len)
    do {i1 = Math.floor (Math.random ()*len)} while (i1 === i0);
    do {i2 = Math.floor (Math.random ()*len)} while (i2 === i0 || i2 === i1);
    do {i3 = Math.floor (Math.random ()*len)} while (i3 === i0 || i3 === i1 || i3 === i2);

    return [arr[i0], arr[i1], arr[i2], arr[i3]]
}

const PlayOne = () => {
    let prize = 0
    for (let row = 0; row < NROW; row++) {
        let seats = randomSeats (randomRow(NCOL))
        const [first, second, third, fourth] = [...seats]

        prize = strategyProg(prize, first, second, third, fourth)
    }
    return prize
}

const Strategy4_1T = (prize, first, second, third) => {
    if (first === T) {
        prize += PRIZE_TEA
        if (second === C)       prize += PRIZE_COFFEE - FEE_TEA
        else if (second === T)  prize += 0-FEE_COFFEE
        else                    prize = 0
    }
    else if (first === C) {
        if (second === T)       prize += PRIZE_TEA - FEE_TEA
        else                    prize = 0
    }
    else prize = 0
    return prize
}

const Strategy4_1C = (prize, first, second, third) => {
    if (first === C) {
        prize += PRIZE_COFFEE
        if (second === T) prize += PRIZE_TEA - FEE_TEA
        else              prize = 0
    }
    else if (first === T) {
        if      (second === C) prize += PRIZE_COFFEE - FEE_TEA
        else if (second === T) prize += 0-FEE_COFFEE
        else                   prize = 0
    }
    else prize = 0
    return prize
}

const Strategy4_1TC = (prize, first, second, third) => {
    if (first === W || second === W) prize = 0

    else if (first  === C) prize += PRIZE_TC + PRIZE_TEA - FEE_TEA
    else if (second === C) prize += PRIZE_TC + PRIZE_COFFEE - FEE_TEA
    else                   prize += PRIZE_TC  - FEE_COFFEE
    return prize
}

const Strategy4_1Tmore = (prize, first, second, third) => {
    if (first === T) {
        prize += PRIZE_TEA
        if (second === C) prize += PRIZE_COFFEE - FEE_TEA
        else if (second === T) {
            prize += 0
            if (prize <= PRIZE_COFFEE) {
                if (third === C) prize += PRIZE_COFFEE
                else prize = 0
            }
            else prize  -= FEE_COFFEE
        }
        else prize = 0
    }
    else if (first === C) {
        prize += 0
        if (second === T) {
            prize += PRIZE_TEA
            if (prize <= PRIZE_TEA) {
                if (third === T) prize += PRIZE_TEA
                else prize = 0
            }
            else  prize -= FEE_TEA
        }
        else prize = 0
    }
    else prize = 0
    return prize
}

const Strategy4_1Cmore = (prize, first, second, third) => {
    if (first === C) {
        prize += PRIZE_COFFEE
        if (second === T) {
            prize += PRIZE_TEA - FEE_TEA
        }
        else prize = 0
    }
    else if (first === T) {
        if (second === C) {
            prize += PRIZE_COFFEE - FEE_TEA
        }
        else if (second === T) {
            if (prize <= PRIZE_COFFEE) {
                if (third === C) prize += PRIZE_COFFEE
                else prize = 0
            }
            else prize -= FEE_COFFEE
        }
        else prize = 0
    }
    else prize = 0
    return prize
}

const Strategy4_1TCmore = (prize, first, second, third) => {
    if (first === T) {
        prize += PRIZE_TC
        if (second === T) {
            prize += PRIZE_TC
            if (prize <= PRIZE_COFFEE) {
                if (third === C) prize += PRIZE_COFFEE
                else prize = 0
            }
            else prize -= FEE_COFFEE
        }
        else if (second === C) {
            prize += PRIZE_TC - FEE_TEA
        }
        else prize = 0
    }
    else if (first === C) {
        prize += PRIZE_TC
        if (second === T) {
            prize += PRIZE_TEA
            if (prize <= (PRIZE_TEA+PRIZE_COFFEE)) {
                if (third === T) prize += PRIZE_TEA
                else prize = 0
            }
            else prize -= FEE_TEA
        }
        else prize = 0
    }
    else prize = 0
    return prize
}

const Strategy4_my = (prize, first, second, third) => {
    if (prize <= PRIZE_COFFEE*2) {
        if (first === C) {
            prize += PRIZE_COFFEE
            if (second === T) prize += PRIZE_TEA - FEE_TEA
            else prize = 0
        }
        else if (first === T) {
            if (second === C) prize += PRIZE_COFFEE - FEE_TEA
            else if (second === T) {
                if (third === C) prize += PRIZE_COFFEE
                else prize = 0
            }
            else prize = 0
        }
        else prize = 0
    }
    else {
        if (first === C) {
            prize += PRIZE_COFFEE
            if (second === T) prize += PRIZE_TEA - FEE_TEA
            else              prize = 0
        }
        else if (first === T) {
            if      (second === C) prize += PRIZE_COFFEE - FEE_TEA
            else if (second === T) prize += 0-FEE_COFFEE
            else                   prize = 0
        }
        else prize = 0
    }
    return prize
}

const Strategy5_1T = (prize, first, second, third) => {
    if (first === T) {
        prize += PRIZE_TEA
        if (second === T) {
            prize += PRIZE_TEA
            if (third === C) prize += PRIZE_COFFEE - FEE_TEA
            else if (third === T) prize += 0-FEE_COFFEE
            else prize  = 0
        }
        else if (second === C) {
            if (third === T) prize += PRIZE_TEA - FEE_TEA
            else prize = 0
        }
        else prize = 0
    }
    else if (first === C) {
        if (second === T) {
            prize += PRIZE_TEA
            if (third === T) prize += PRIZE_TEA - FEE_TEA
            else prize = 0
        }
        else prize = 0
    }
    else prize = 0

    return prize
}

const Strategy5_1C = (prize, first, second, third) => {
    if (first === C) {
        prize += PRIZE_COFFEE
        if (second === T) {
            prize += PRIZE_TEA
            if (third === T) prize += PRIZE_TEA - FEE_TEA
            else prize  = 0
        }
        else prize = 0
    }
    else if (first === T) {
        if (second === C) {
            prize += PRIZE_COFFEE
            if (third === T) prize += PRIZE_TEA - FEE_TEA
            else prize = 0
        }
        else if (second === T) {
            if (third === C) prize += PRIZE_COFFEE - FEE_TEA
            else if (third === T) prize += 0 - FEE_COFFEE
            else prize = 0
        }
        else prize = 0
    }
    else prize = 0

    return prize
}

const Strategy5_1TC = (prize, first, second, third) => {
    if (first === T) {
        prize += PRIZE_TC
        if (second === T) {
            prize += PRIZE_TC
            if (third === C) prize += PRIZE_COFFEE - FEE_TEA
            else if (third === T) prize += 0 - FEE_COFFEE
            else prize  = 0
        }
        else if (second === C) {
            prize += PRIZE_TC
            if (third === T) prize += PRIZE_TEA - FEE_TEA
            else prize = 0
        }
        else prize = 0
    }
    else if (first === C) {
        prize += PRIZE_TC
        if (second === T) {
            prize += PRIZE_TEA
            if (third === T) prize += PRIZE_TEA - FEE_TEA
            else prize = 0
        }
        else prize = 0
    }
    else prize = 0

    return prize
}

const Strategy5_1Tmore = (prize, first, second, third, fourth) => {
    if (first === T) {
        prize += PRIZE_TEA
        if (second === T) {
            prize += PRIZE_TEA
            if (third === C) {
                prize += PRIZE_COFFEE - FEE_TEA
            }
            else if (third === T) {
                if (prize < PRIZE_COFFEE) {
                    if (fourth === C) prize += PRIZE_COFFEE
                    else prize = 0
                }
                else prize += 0 - FEE_COFFEE
            }
            else prize = 0
        }
        else if (second === C) {
            if (third === T) prize += PRIZE_TEA - FEE_TEA
            else prize = 0
        }
        else prize = 0
    }
    else if (first === C) {
        if (second === T && third === T) prize += PRIZE_TEA*2 - FEE_TEA
        else prize = 0
    }
    else prize = 0

    return prize
}

const Strategy5_1Cmore = (prize, first, second, third, fourth) => {
    if (first === C) {
        prize += PRIZE_COFFEE
        if (second === T && third === T) prize += PRIZE_TEA*2 - FEE_TEA
        else prize = 0
    }
    else if (first === T) {
        if (second === C) {
            prize += PRIZE_COFFEE
            if (third === T) prize += PRIZE_TEA - FEE_TEA
            else prize = 0
        }
        else if (second === T) {
            if (third === C) {
                prize += PRIZE_COFFEE - FEE_TEA
            }
            else if (third === T) {
                if (prize < PRIZE_COFFEE) {
                    if (fourth === C) prize += PRIZE_COFFEE
                    else prize = 0
                }
                prize += 0 - FEE_COFFEE
            }
            else prize = 0
        }
        else prize = 0
    }
    else prize = 0

    return prize
}

const Strategy5_1TCmore = (prize, first, second, third, fourth) => {
    if (first === T) {
        prize += PRIZE_TC
        if (second === T) {
            prize += PRIZE_TC
            if (third === C) {
                prize += PRIZE_COFFEE - FEE_TEA
            }
            else if (third === T) {
                if (prize < PRIZE_COFFEE) {
                    if (fourth === C) prize += PRIZE_COFFEE
                    else prize = 0
                }
                else prize += 0 - FEE_COFFEE
            }
            else prize = 0
        }
        else if (second === C) {
            if (third === T) prize += PRIZE_TEA - FEE_TEA
            else prize = 0
        }
        else prize = 0
    }
    else if (first === C) {
        prize += PRIZE_TC
        if (second === T && third === T) prize += PRIZE_TEA*2 - FEE_TEA
        else prize = 0
    }
    else prize = 0

    return prize
}

const Strategy5_my = (prize, first, second, third, fourth) => {
    if (first === C) {
        prize += PRIZE_COFFEE
        if (second === T && third === T) prize += PRIZE_TEA*2 - FEE_TEA
        else prize = 0
    }
    else if (first === T) {
        if (second === C) {
            prize += PRIZE_COFFEE
            if (third === T) prize += PRIZE_TEA - FEE_TEA
            else prize = 0
        }
        else if (second === T) {
            if (third === C) {
                prize += PRIZE_COFFEE - FEE_TEA
            }
            else if (third === T) {
                if (prize <= PRIZE_COFFEE*2) {
                    if (fourth === C) prize += PRIZE_COFFEE
                    else prize = 0
                }
                prize += 0 - FEE_COFFEE
            }
            else prize = 0
        }
        else prize = 0
    }
    else prize = 0

    return prize
}

const makeDescription = (strings) => {
    return strings.map((item, i) => <div key={i}>{item}</div>)
}

const description = {
    '4':
        {

            '1T': [
                'Q1: T IF T -> Q2: C',
                '      IF C -> Q2: T',
            ],
            '1C': [
                'Q1: C IF C -> Q2: T',
                '      IF T -> Q2: C',
            ],
            '1T/C': [
                'Q1: T/C  IF C -> Q2: T',
                '         IF T -> Q2: C',
            ],
            '1Tmore': [
                'Q1: T IF T -> Q2: C IF (T&Prz<=c) -> Q3: C',
                '      IF C -> Q2: T IF (T&Prz<=t) -> Q3: T',
            ],
            '1Cmore': [
                'Q1: C IF C -> Q2: T',
                '      IF T -> Q2: C IF (T&Prz<=c) -> Q3: C',
            ],
            '1T/Cmore': [
                'Q1: T/C IF T -> Q2: T/C IF (T&Prz<=c) -> Q3: C',
                '                        else Next',
                'Q1: T/C IF C -> Q2: T   IF (T&Prz<=(t+c)) -> Q3: T',
                '                        else Next',
            ],
            'my': [
                'IF Prz  <= c*2:',
                '    Q1: C IF C -> Q2: T',
                '    Q1: C IF T -> Q2: C IF T -> Q3: C',
                'IF Prz != 0:',
                '    Q1: C IF C -> Q2: T',
                '    Q1: C IF T -> Q2: C',
            ],
        },
    '5': {
        '1T': [
            'Q1: T IF T -> Q2: T IF T -> Q3: C',
            '                    IF C -> Q3: T',
            '      IF C -> Q2: T IF T -> Q3: T',
        ],
        '1C': [
            'Q1: C IF C -> Q2: T IF T -> Q3: T',
            '      IF T -> Q2: C IF C -> Q3: T',
            '                    IF T -> Q3: C',
        ],
        '1T/C': [
            'Q1: T/C IF T -> Q2: T/C IF T -> Q3: C',
            '                        IF C -> Q3: T',
            '        IF C -> Q2: T   IF T -> Q3: T',
        ],
        '1Tmore': [
            'Q1: T IF T -> Q2: T IF T -> Q3: C IF T&Prz<c -> Q4:C',
            '                    IF C -> Q3: T',
            '      IF C -> Q2: T IF T -> Q3: T',
        ],
        '1Cmore': [
            'Q1: C IF C -> Q2: T IF T -> Q3: T',
            '      IF T -> Q2: C IF C -> Q3: T',
            '                    IF T -> Q3: C IF T&Prz<c -> Q4: C',
        ],
        '1T/Cmore': [
            'Q1: T/C IF T -> Q2: T/C IF T -> Q3: C IF T&Prz<c -> Q4: C',
            '                        IF C -> Q3: T',
            '        IF C -> Q2: T   IF T -> Q3: T',
        ],
        'my': [
            'Q1: C IF C -> Q2: T IF T -> Q3: T',
            '      IF T -> Q2: C IF C -> Q3: T',
            '                    IF T -> Q3: C IF T&Prz<=c*2 -> Q4: C',
        ],
    },
}
const realization = {
    '4': {

        '1T'        : Strategy4_1T.toString(),
        '1C'        : Strategy4_1C.toString(),
        '1T/C'      : Strategy4_1TC.toString(),
        '1Tmore'    : Strategy4_1Tmore.toString(),
        '1Cmore'    : Strategy4_1Cmore.toString(),
        '1T/Cmore'  : Strategy4_1TCmore.toString(),
        'my'        : Strategy4_my.toString(),
    },
    '5': {
        '1T'        : Strategy5_1T.toString(),
        '1C'        : Strategy5_1C.toString(),
        '1T/C'      : Strategy5_1TC.toString(),
        '1Tmore'    : Strategy5_1Tmore.toString(),
        '1Cmore'    : Strategy5_1Cmore.toString(),
        '1T/Cmore'  : Strategy5_1TCmore.toString(),
        'my'        : Strategy5_my.toString(),
    },
}

export let stat = {
    strategies: {
        '4':
            [
                {title: '1T'            , descr: '1T @ 2steps'      , prog: Strategy4_1T},
                {title: '1C'            , descr: '1C @ 2steps'      , prog: Strategy4_1C},
                {title: '1T/C'          , descr: '1T/C @ 2steps'    , prog: Strategy4_1TC},
                {title: '1Tmore'        , descr: '1T @ 3steps'      , prog: Strategy4_1Tmore},
                {title: '1Cmore'        , descr: '1C @ 3steps'      , prog: Strategy4_1Cmore},
                {title: '1T/Cmore'      , descr: '1T/C @ 3steps'    , prog: Strategy4_1TCmore},
                {title: 'my'            , descr: 'Co+1C @ 3steps'   , prog: Strategy4_my},
            ],
        '5': [
            {title: '1T'                , descr: '1T @ 3steps'      , prog: Strategy5_1T},
            {title: '1C'                , descr: '1C @ 3steps'      , prog: Strategy5_1C},
            {title: '1T/C'              , descr: '1T/C @ 3steps'    , prog: Strategy5_1TC},
            {title: '1Tmore'            , descr: '1T @ 4steps'      , prog: Strategy5_1Tmore},
            {title: '1Cmore'            , descr: '1C @ 4steps'      , prog: Strategy5_1Cmore},
            {title: '1T/Cmore'          , descr: '1T/C @ 4steps'    , prog: Strategy5_1TCmore},
            {title: 'my'                , descr: 'Co+1C @ 4steps'   , prog: Strategy5_my},
        ],
    },

    start: false,
    count: 0,
    min: 0,
    negCount:0,
    gist: [],
    nInSeries: 100000,
    strategy: '1T',
    timerId: undefined,
    isDescription: false,
    isRealization: false,

    stopTimer: () => {
        if (stat.timerId !== undefined)
            clearInterval(stat.timerId)
        stat.timerId = undefined
    },

    newStrategy: (strat) => {
        stat.strategy = strat;
        strategyProg = stat.strategies[NCOL].find((item) => {return item.title === stat.strategy}).prog
    },

    create: () => {
        setParamFromGame()
        stat.newStrategy(stat.strategy)
        stat.clear()
        stat.stopTimer()
    },

    clear: () => {
        stat.count = 0
        stat.min = 0
        stat.negCount = 0
        for (let i = 0; i < NPRIZES_MAX; i++)
            stat.gist[i] = 0
    },

    Play() {
        for (let i = 0; i < stat.nInSeries; i++) {
            let ind = PlayOne ()

            if (ind < 0)        stat.negCount++
            if (ind < stat.min) stat.min = ind

            stat.gist[Math.max (0, ind)]++
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
    let totalPrzs = stat.gist.reduce((x, y, i) => x + y * i, 0)
    let totalPercent = stat.gist.reduce((x, y, i) => x + y * 100 / (stat.count || 1), 0)
    let totalPercentPrzs = stat.gist.reduce((x, y, i) => x + y * i / (totalPrzs || 1) * 100, 0)
    let average = totalPrzs / (stat.count || 1)

    setParamFromGame()
    stat.newStrategy(stat.strategy)

    const MakeAll = () => {
        const MakeRow = (row) => {
            if (stat.gist[row] === 0) return null;

            const PX_FOR_ONE_GAME = 1

            //ищем змаксимальное значение в массиве без учета элемента с индексом 0
            let [, ...normaArr] = [...stat.gist]
            const norma = Math.max(...normaArr)

            let maxWidth = window.innerWidth - 400
            let coeff = PX_FOR_ONE_GAME
            if (norma * PX_FOR_ONE_GAME > maxWidth) {
                coeff = (maxWidth - 20) / norma
            }
            let value = stat.gist[row]
            let valuePrz = value * row
            let width = Math.min(maxWidth, value * coeff)

            let percent = value / (stat.count || 1) * 100
            let percentPrz = valuePrz / (totalPrzs || 1) * 100

            return (
                <div key={row}>
                    <button className={s.buttonPrize}>{row}</button>
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

        for (let row = 0; row < NPRIZES_MAX; row++) {
            rows.push(MakeRow(row))
        }

        rows.push(<div key={'footer'}>
            <button className={s.butPrize}>Total:</button>
            <button className={s.butGames}>{stat.count}</button>
            <button className={s.butGames}>{totalPercent.toLocaleString("ru-RU", {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3
            })}</button>
            <button className={s.butGames}>{totalPrzs}</button>
            <button className={s.butGames}>{totalPercentPrzs.toLocaleString("ru-RU", {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3
            })}</button>
        </div>)

        return rows;
    }

    let text = stat.start ? 'Перестать играть' : 'Играть серии непрерывно'
    let maxPrzIndex = stat.gist.length
    while (maxPrzIndex && stat.gist[--maxPrzIndex] === 0);

    const makeSelect = () => {
        let rows = []
        stat.strategies[NCOL].forEach ((item, ind) => {
            rows.push (<option key = {ind} value={item.title} selected={stat.strategy === item.title}>{item.descr}</option>)
        })
        return rows
    }

    return (
        <div className={s.main}>
            <div className={s.Select}>
                <label>Strategy:
                    <select className={s.select} onChange={(e) => {
                        stat.newStrategy(e.target.value)
                        stat.clear ()
                        game.rerender()
                    }}>
                        {makeSelect()}
{/*
                            <option value={'1T'} selected={stat.strategy === '1T'}>1T @ 2steps</option>
                            <option value={'1C'} selected={stat.strategy === '1C'}>1C @ 2steps</option>
                            <option value={'1T/C'} selected={stat.strategy === '1T/C'}>1T/C @ 2steps</option>
                            <option value={'1T@Mix'} selected={stat.strategy === '1T@Mix'}>1T @ 3steps</option>
                            <option value={'1C @ 3steps'} selected={stat.strategy === '1C @ 3steps'}>1C @ 3steps</option>
                            <option value={'T/C'} selected={stat.strategy === 'T/C'}>1T/C @ 3steps</option>
                            <option value={'onlyC'} selected={stat.strategy === 'onlyC'}>Co+1C  @ 3steps</option>
*/}
                        }
                    </select>
                </label>
            </div>

            <div>
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
                <div className={s.description} > {makeDescription (description[NCOL][stat.strategy])} </div> :
                null
            }

            {stat.isRealization ?
                <div className={s.realization} > {makeDescription (realization[NCOL][stat.strategy].split ('\n'))} </div> :
                null
            }

            <div>
                <button className={s.toMainGame} onClick={() => {
                    props.game.isStatistic = false
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

            <div className={s.total}>Total Games: {stat.count.toLocaleString("ru-RU", {useGrouping: true})}</div>
            <div className={s.total}>Total Przes: {totalPrzs.toLocaleString("ru-RU", {useGrouping: true})}</div>
            <div className={s.total}>Aver Prz   : {average.toLocaleString("ru-RU", {minimumFractionDigits: 4, maximumFractionDigits: 4})}</div>

            <div className={s.total}> </div>

            <div className={s.total}>Prz=0@%    : {(stat.gist[0]/(stat.count||1)*100).toLocaleString("ru-RU", {minimumFractionDigits: 4, maximumFractionDigits: 4})}%</div>
            <div className={s.total}>Prz=1...5@%: {((stat.gist.reduce ((x,y,i) => i < 6 && i > 0 ? x+y:x, 0))/(stat.count||1)*100).toLocaleString("ru-RU", {minimumFractionDigits: 4, maximumFractionDigits: 4})}%</div>
            <div className={s.total}>Prz=6@%    : {(stat.gist[6]/(stat.count||1)*100).toLocaleString("ru-RU", {minimumFractionDigits: 4, maximumFractionDigits: 4})}%</div>
            <div className={s.total}>MaxPrz@%   : {maxPrzIndex} {(stat.gist[maxPrzIndex]/(stat.count||1)*100).toLocaleString("ru-RU", {minimumFractionDigits: 4, maximumFractionDigits: 4})}%</div>
            <div className={s.total}>MinPrz@%   : {stat.min}, total negative: {(stat.negCount/(stat.count||1)*100).toLocaleString("ru-RU", {minimumFractionDigits: 4, maximumFractionDigits: 4})}%</div>

            <div className={s.total}> </div>

            <div className={s.total}>Prizes  : Tea/Coffee = {PRIZE_TC}, Tea= {PRIZE_TEA}, Coffee = {PRIZE_COFFEE}</div>
            <div className={s.total}>Fee Type: {props.game.feeType}</div>
        </div>
    )
}
