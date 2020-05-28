// import React from "react";
// import CryptoJS from  'js/CryptoJS/core.js'

/*
    {<script type='text/javascript' src='js/CryptoJS/core.js'></script>}
    {<script type='text/javascript' src='js/CryptoJS/md5.js'></script>}
*/

export const constData9x6W123C1 = {
    nRow: 9,
    nCol: 6,

    nPreferTea: 27,
    nPreferCoffee: 9,
    nPreferWater: 18,

    prizeTea: 2,
    prizeCoffee: 4,
    prizeTeaCoffee: 1,

    randomType: 'W123C1'
}

export const constData9x6W12C1 = {
    nRow: 9,
    nCol: 6,

    nPreferTea: 32,
    nPreferCoffee: 9,
    nPreferWater: 13,

    prizeTea: 2,
    prizeCoffee: 4,
    prizeTeaCoffee: 1,

    randomType: 'W12C1'
}

export const constData9x5W123C1 = {
    nRow: 9,
    nCol: 5,

    nPreferTea: 18,
    nPreferCoffee: 9,
    nPreferWater: 18,

    prizeTea: 2,
    prizeCoffee: 4,
    prizeTeaCoffee: 1,

    randomType: 'W123C1'
}

export const constData6x4W12 = {
    nRow: 6,
    nCol: 4,

    nPreferTea: 10,
    nPreferCoffee: 5,
    nPreferWater: 9,

    prizeTea: 2,
    prizeCoffee: 4,
    prizeTeaCoffee: 1,

    randomType: 'W12'
}

export const constData6x4W1C1 = {
    nRow: 6,
    nCol: 4,

    nPreferTea: 12,
    nPreferCoffee: 6,
    nPreferWater: 6,

    prizeTea: 2,
    prizeCoffee: 4,
    prizeTeaCoffee: 1,

    randomType: 'W1C1'
}

export const constData9x5W1C1 = {
    nRow: 9,
    nCol: 5,

    nPreferTea: 27,
    nPreferCoffee: 9,
    nPreferWater: 9,

    prizeTea: 2,
    prizeCoffee: 5,
    prizeTeaCoffee: 1,

    randomType: 'W1C1'
}

export const constData9x6W1C1 = {
    nRow: 9,
    nCol: 6,

    nPreferTea: 36,
    nPreferCoffee: 9,
    nPreferWater: 9,

    prizeTea: 2,
    prizeCoffee: 6,
    prizeTeaCoffee: 1,

    randomType: 'W1C1'
}

let game = {
    givenToLetter: {Tea: 'T', Coffee: 'C', Water: 'W'},

    haveParamComponent () {return this.isParamComponent},

    calcPrizeMax () {
        this.prizeMax = this.prize
        for (let ind = this.activeRow * this.nCol; ind < this.nSize; ind++) {
            if (!this.seats[ind].served && this.seats[ind].given !== 'Water')
                this.prizeMax += (this.seats[ind].given === 'Tea') ? this.prizeTea : this.prizeCoffee
        }
    },
    randomString (length) {
        // let hash = CryptoJS-.MD5 ("Message")
        const chars = 'abcdef0123456789'
        let charsLen = chars.length
        let result = ''
        for (let i = 0; i < length; i++)
            result += chars.charAt(Math.random()*charsLen)
        return result
    },
    onClickHint () {
        game.hintChecked = !game.hintChecked
        game.rerender ()
    },

    isPass (col, nCol) {
        const passes = [
            [1, 1],     //nCol = 0
            [1, 1],     //nCol = 1
            [1, 1],     //nCol = 2
            [2, 2],     //nCol = 3
            [2, 2],     //nCol = 4
            [3, 3],     //nCol = 5
            [3, 3],     //nCol = 6
            [2, 5],     //nCol = 7
            [2, 6],     //nCol = 8
            [3, 6],     //nCol = 9
            [3, 7],     //nCol = 10
            [3, 8],     //nCol = 11
            [3, 9],     //nCol = 12
        ]
        if (passes[nCol][0] === col ||
            passes[nCol][1] === col) return true
        else return false
    },
    isSeatEnabled  (row, col)  {
        let ind = this.getIndex(row, col)
        if (this.gameEnded || this.seats[ind].served) return false

        //Второй ряд открываем, когда открыта не менее половина в текущем ряду
        return (row === this.activeRow) ||
               (row === (this.activeRow+1) && this.nServedInRow >= this.nCol/2)
    },

    seatOffer (ind) {
        let row = game.getRow (ind)
        let col = game.getCol (ind)
        let seat = game.seats[ind]

        if (seat.served || !game.isSeatEnabled (row, col)) {
            return
        }

        seat.served = true
        seat.isQuestionTea = game.isQuestionTea
        seat.isQuestionCoffee = game.isQuestionCoffee
        seat.isQuestionTeaCoffee = game.isQuestionTeaCoffee

        if (seat.given === 'Water')  game.prize = 0
        else if (seat.isQuestionTeaCoffee) game.prize += game.prizeTeaCoffee
        else if (seat.isQuestionTea && seat.given === 'Tea') game.prize += game.prizeTea
        else if (seat.isQuestionCoffee && seat.given === 'Coffee') game.prize += game.prizeCoffee
        else game.prize += 0    //not correct answer

        //Вычисляем новое значение activeRow и nServedInRow
        if (row === game.activeRow) {
            if (seat.given === 'Water' || game.nServedInRow === (game.nCol-1)) {
                game.activeRow++
                game.nServedInRow = 0
            }
            else {
                game.nServedInRow++
            }
        }
        else {  //row === (game.activeRow+1)
            if (seat.given === 'Water') {
                game.activeRow += 2
                game.nServedInRow = 0
            }
            else {
                game.activeRow += 1
                game.nServedInRow = 1
            }
        }

        game.nextServed = undefined
        game.calcPrizeMax ()

        if (game.activeRow === game.nRow) {
            game.onClickEndGame()
            game.onClickEndGame()   //!! Doubled call to changed hint in proper state
        }
        else
            game.rerender()
    },


    onClickTake (ind) {
        game.onClickEndGame()
    },

    onClickSeat (ind) {
        game.nextServed = ind
        game.rerender()
    },

    onClickNewGame() {
        let prizeTea = Number (this.prizeTeaStr)
        let prizeCoffee = Number (this.prizeCoffeeStr)
        let prizeTeaCoffee = Number (this.prizeTeaCoffeeStr)
        let nPreferTea = Number (this.nPreferTeaStr)
        let nPreferCoffee = Number (this.nPreferCoffeeStr)
        let nPreferWater = Number (this.nPreferWaterStr)
        let nRow = Number (this.nRowStr)
        let nCol = Number (this.nColStr)
        let randomType = this.randomTypeStr

/*
        //Вариант запрета соседей-Water
        const maxWaterInRow = [
            0,
            1,  //for 1 seat in raw
            2,
            2,
            2,
            3,  //for 5 seat in raw
            4,  //for 6 seat in raw
            4,
            4,
            6,
            6,  //for 10 seat in raw
            7,  //for 11 seat in raw
            7,  //for 12 seat in raw
        ]
        if (nPreferWater >= maxWaterInRow[nCol]*nRow) {alert ('The number of Water Answers is too large'); return}
        //Вариант 2: в ряду 1-2 Water (равновероятно)
        let nWater = Math.floor(nRow*1.5)
        if (nPreferWater !== nWater) {alert (`The number of Water Answers must be equal ${nWater}`); return}
*/

        this.initialize ({
            nRow: nRow,
            nCol: nCol,

            nPreferTea: nPreferTea,
            nPreferCoffee: nPreferCoffee,
            nPreferWater: nPreferWater,

            prizeTea: prizeTea,
            prizeCoffee: prizeCoffee,
            prizeTeaCoffee: prizeTeaCoffee,

            randomType: randomType
        }, this.haveParamComponent ())
        this.rerender ()
    },

    onClickEndGame () {
        // game.hintChecked = true
        game.gameEnded = true

        this.rerender ()
    },

    onClickQuestionTea () {
        this.isQuestionTea = true;
        this.isQuestionCoffee = false;
        this.isQuestionTeaCoffee = false;
        this.rerender ()
    },
    onClickQuestionCoffee () {
        this.isQuestionTea = false;
        this.isQuestionCoffee = true;
        this.isQuestionTeaCoffee = false;
        this.rerender ()
    },
    onClickQuestionTeaCoffee() {
        this.isQuestionTea = false;
        this.isQuestionCoffee = false;
        this.isQuestionTeaCoffee = true;
        this.rerender()
    },

    correctData () {
        if (isNaN(this.nRowStr))         this.nRowStr = '0'
        if (isNaN(this.nColStr))         this.nColStr = '0'
        if (isNaN(this.nPreferCoffeeStr)) this.nPreferCoffeeStr = '0'

        let nRow = Math.max (1, Math.min (12, Number (this.nRowStr)))
        let nCol = Math.max (3, Math.min (6, Number (this.nColStr)))

        let nPreferWater
        let nPreferCoffee
        let nPreferTea
        switch (this.randomTypeStr) {
            case 'W123C1':
                nPreferWater =  Math.floor(nRow/3) * 6 + ((nRow%3 === 1) ? 1 : (nRow%3 === 2) ? 3 : 0)
                nPreferCoffee = nRow
                nPreferTea = nRow * nCol - nPreferCoffee - nPreferWater
                break
            case 'W12':
                nPreferWater =  Math.floor(nRow/2) * 3 + ((nRow%2 === 1) ? 1 : 0)
                nPreferCoffee = Math.min (Number (this.nPreferCoffeeStr), nRow*nCol - nPreferWater)
                nPreferTea = nRow * nCol - nPreferCoffee - nPreferWater
                break
            case 'W12C1':
                nPreferWater =  Math.floor(nRow/2) * 3 + ((nRow%2 === 1) ? 1 : 0)
                nPreferCoffee = nRow
                nPreferTea = nRow * nCol - nPreferCoffee - nPreferWater
                break
            case 'W1C1':
                nPreferWater =  nRow
                nPreferCoffee = nRow
                nPreferTea = nRow * nCol - nPreferCoffee - nPreferWater
                break
            default: break
        }

        this.nRowStr = nRow
        this.nColStr = nCol

        this.nPreferWaterStr = nPreferWater
        this.nPreferCoffeeStr = nPreferCoffee
        this.nPreferTeaStr = nPreferTea
    },
    onChangeRandomType(body) {
        this.randomTypeStr = body
        this.correctData ()
        this.rerender()
    },
    onChangeGameSelect(body)           {
        switch (body) {
            case 'param'    : this.initialize (constData9x6W123C1,true ); break
            case '9x5W123C1': this.initialize (constData9x5W123C1,false); break
            case '6x4W12'   : this.initialize (constData6x4W12   ,false); break
            case '9x6W12C1' : this.initialize (constData9x6W12C1 ,false); break
            case '6x4W1C1'  : this.initialize (constData6x4W1C1  ,false); break
            case '9x5W1C1'  : this.initialize (constData9x5W1C1  ,false); break
            case '9x6W1C1'  : this.initialize (constData9x6W1C1  ,false); break

            case '9x6W123C1':
            default         : this.initialize (constData9x6W123C1,false); break
        }
        this.rerender()
    },
    onChangeRow(body) {
        this.nRowStr = (Number (body) > 12) ? body.charAt (1) : body;
        this.correctData ();
        this.rerender()
    },
    onChangeCol(body) {
        this.nColStr = body.charAt (body.length-1);
        this.correctData ();
        this.rerender()
    },

    onChangePreferTea(body)     {this.nPreferTeaStr = body; this.correctData ();     this.rerender()},
    onChangePreferCoffee(body)  {this.nPreferCoffeeStr = body; this.correctData ();  this.rerender()},
    onChangePreferWater(body)   {this.nPreferWaterStr = body; this.correctData ();   this.rerender()},

    onChangePrizeTea(body)      {this.prizeTeaStr = body;       this.rerender()},
    onChangePrizeCoffee(body)   {this.prizeCoffeeStr = body;    this.rerender()},
    onChangePrizeTeaCoffee(body){this.prizeTeaCoffeeStr = body; this.rerender()},

    create (rerender) {
        this.rerender = rerender
        this.initialize (constData9x6W123C1, false)
    },

    initialize(data, haveParamComponent) {
        this.isParamComponent = haveParamComponent

        let nRow = data.nRow
        let nCol = data.nCol

        this.nRow = nRow
        this.nCol = nCol

        this.nPreferTea = data.nPreferTea
        this.nPreferCoffee = data.nPreferCoffee
        this.nPreferWater = data.nPreferWater

        this.prizeTea = data.prizeTea
        this.prizeCoffee = data.prizeCoffee
        this.prizeTeaCoffee = data.prizeTeaCoffee

        this.randomType = data.randomType

        this.isQuestionTea = true
        this.isQuestionCoffee = false
        this.isQuestionTeaCoffee = false

        this.gameEnded = false
        this.hintChecked = false
        this.nSize = nRow * nCol
        this.nextServed = undefined
        this.prize = 0
        this.activeRow = 0
        this.nServedInRow = 0

        //for Param Dialog
        this.randomTypeStr = data.randomType

        this.nRowStr = this.nRow
        this.nColStr = this.nCol

        this.nPreferTeaStr = this.nPreferTea
        this.nPreferCoffeeStr = this.nPreferCoffee
        this.nPreferWaterStr = this.nPreferWater

        this.prizeTeaStr = this.prizeTea
        this.prizeCoffeeStr = this.prizeCoffee
        this.prizeTeaCoffeeStr = this.prizeTeaCoffee
        //End Param Dialog

        //Calculate random value for 'given' property

        //Вариант случайной выборки из массива prefer с ограничением:
        //в одном ряду равновероятно одна или две воды так, что в сумме они дадут nRow*1.5 воды
        //
        if (data.randomType === 'W12') {
            this.seats = []

            let prefer = []
            for (let i = 0; i < this.nPreferTea; i++) prefer.push('Tea')
            for (let i = 0; i < this.nPreferCoffee; i++) prefer.push('Coffee')

            //0. Проверяем корректность данных
            //if (this.nPreferWater !== nRow*1.5) alert('Improper number of Water Answers')

            //1. Создаем массив one-two: сначала nRow/2 единиц, потом nRow/2 двоек
            let one_two = []
            for (let i = 0; i < Math.floor((nRow + 1) / 2); i++) one_two.push(1)   //(nRow+1) - for odd nRow
            for (let i = 0; i < Math.floor(nRow / 2); i++) one_two.push(2)
            //2. Создаем массив one_two_rand - случайно перемешанный one_two
            let one_two_rand = []
            for (let i = 0; i < nRow; i++) {
                let ind = Math.floor(Math.random() * one_two.length)
                let val = one_two[ind]
                one_two_rand.push(val)
                one_two.splice(ind, 1)          //delete element from array
            }
            //3. Создаем массив preferRand - случайно перемешанный массив prefer с
            //требуемыми ограничениями
            //3.1. Заполняем ряды
            for (let j = 0; j < nRow; j++) {
                let rowRand = []
                //Сначала заполним места с Water
                for (let i = 0; i < one_two_rand[j]; i++) {
                    let ind
                    do {
                        ind = Math.floor(Math.random() * nCol)
                    } while (rowRand[ind] !== undefined)
                    rowRand[ind] = 'Water'
                }
                //Остальные места заполним из массива prefer
                let p = 0
                for (let i = one_two_rand[j]; i < nCol; i++) {
                    let ind = Math.floor(Math.random() * prefer.length)
                    let given = prefer[ind]
                    prefer.splice(ind, 1)          //delete element from array

                    while (rowRand[p] !== undefined) p++      //пропускаем уже заполненные места
                    rowRand[p++] = given
                }
                //Создаем Seat в соответствии с данными из массива rowRand
                for (let i = 0; i < nCol; i++) {
                    let seat = this.createSeat(j, i, rowRand[i])
                    this.seats.push(seat)
                }
            }
        }

        //Вариант случайной выборки из массива prefer с ограничением:
        //в одном ряду равновероятно одна или две воды так, что в сумме они дадут nRow*1.5 воды
        //В каждом ряду 1 кофе
        if (data.randomType === 'W12C1') {
            this.seats = []

            //1. Создаем массив one-two: сначала nRow/2 единиц, потом nRow/2 двоек
            let one_two = []
            for (let i = 0; i < Math.floor((nRow + 1) / 2); i++) one_two.push(1)   //(nRow+1) - for odd nRow
            for (let i = 0; i < Math.floor(nRow / 2); i++) one_two.push(2)
            //2. Создаем массив one_two_rand - случайно перемешанный one_two
            let one_two_rand = []
            for (let i = 0; i < nRow; i++) {
                let ind = Math.floor(Math.random() * one_two.length)
                let val = one_two[ind]
                one_two_rand.push(val)
                one_two.splice(ind, 1)          //delete element from array
            }

            //3. Заполняем ряды
            for (let j = 0; j < nRow; j++) {
                let i = 0
                let prefer = ['Coffee']                                 //Coffee - one
                for (; i < one_two_rand[j]; i++) prefer.push('Water')    //Water - one_two_rand[j]
                for (i++; i < nCol; i++) prefer.push('Tea')               //Tea - other

                for (let i = 0; i < nCol; i++) {
                    let ind = Math.floor(Math.random() * prefer.length)
                    let given = prefer[ind]
                    prefer.splice(ind, 1)          //delete element from array

                    let seat = this.createSeat(j, i, given)
                    this.seats.push(seat)
                }
            }
        }

        //Вариант случайной выборки из массива prefer с ограничением:
        //в одной секции кресел (между проходами) не допускаются 2 воды рядом.
        //
        if (data.randomType === 'Wnot2') {
            this.seats = []

            let prefer = []
            for (let i = 0; i < this.nPreferTea; i++) prefer.push('Tea')
            for (let i = 0; i < this.nPreferCoffee; i++) prefer.push('Coffee')
            for (let i = 0; i < this.nPreferWater; i++) prefer.push('Water')

            const maxCount = 100
            while (true) {
                let preferRand = prefer.slice()
                this.seats = []
                let count
                for (let j = 0; j < nRow; j++) {
                    let prev = false
                    for (let i = 0; i < nCol; i++) {
                        let given, ind
                        count = 0
                        do {
                            ind = Math.floor(Math.random() * preferRand.length)
                            given = preferRand[ind]
                            count++
                            if (count === maxCount) break
                        } while (given === 'Water' && prev)
                        if (count === maxCount) break
                        preferRand.splice(ind, 1)          //delete element from array
                        if (given === 'Water') prev = true
                        else prev = false
                        if (this.isPass(i + 1, nCol)) prev = false

                        let seat = this.createSeat(j, i, given)
                        this.seats.push(seat)
                    }
                    if (count === maxCount) break
                }
                if (count !== maxCount) break
            }
        }

        //Вавриант абсолютно случайной выборки из массива prefer[]
        //
        if (data.randomType === 'random') {
            this.seats = []

            let prefer = []
            for (let i = 0; i < this.nPreferTea; i++) prefer.push('Tea')
            for (let i = 0; i < this.nPreferCoffee; i++) prefer.push('Coffee')
            for (let i = 0; i < this.nPreferWater; i++) prefer.push('Water')

            for (let j = 0; j < nRow; j++) {
                for (let i = 0; i < nCol; i++) {
                    let ind = Math.floor(Math.random() * prefer.length)
                    let given = prefer[ind]
                    prefer.splice(ind, 1)          //delete element from array

                    let seat = this.createSeat(j, i, given)
                    this.seats.push(seat)
                }
            }
        }
        //Вавриант блока из 3-х рядов
        //
        if (data.randomType === 'W123C1') {
            const T = 0
            const C = 1
            const W = 2
            let preferInThreeRow = [
                [W, T, T, T, T, C],
                [W, W, T, T, T, C],
                [W, W, W, T, T, C]
            ]
            switch (nCol) {
                case 5:
                    preferInThreeRow = [
                        [W, T, T, T, C],
                        [W, W, T, T, C],
                        [W, W, W, T, C]
                    ]
                    break
                case 4:
                    preferInThreeRow = [
                        [W, T, T, C],
                        [W, W, T, C],
                        [W, W, W, C]
                    ]
                    break
                case 3:
                    preferInThreeRow = [
                        [W, T, C],
                        [W, W, T],
                        [W, W, W]
                    ]
                    break
                default: break
            }


            this.seats = []
            for (let j = 0; j < nRow; j++) {
                let prefer = preferInThreeRow[j % 3].slice()
                prefer = prefer.map((e) => e === T ? 'Tea' : (e === C) ? 'Coffee' : 'Water')
                for (let i = 0; i < nCol; i++) {
                    let ind = Math.floor(Math.random() * prefer.length)
                    let given = prefer[ind]
                    prefer.splice(ind, 1)          //delete element from array

                    let seat = this.createSeat(j, i, given)
                    this.seats.push(seat)
                }
            }
        }

        //Вавриант блока из 3-х рядов
        //
        if (data.randomType === 'W1C1') {
            const T = 0
            const C = 1
            const W = 2

            let preferInRow = [W, C, T, T, T, T];   //NB! Now 6 seats maximum only

            this.seats = []
            for (let j = 0; j < nRow; j++) {
                let prefer = preferInRow.map((e) => e === T ? 'Tea' : (e === C) ? 'Coffee' : 'Water')

                for (let i = 0; i < nCol; i++) {
                    let ind = Math.floor(Math.random() * prefer.length)
                    let given = prefer[ind]
                    prefer.splice(ind, 1)          //delete element from array

                    let seat = this.createSeat(j, i, given)
                    this.seats.push(seat)
                }
            }
        }

        this.openCodeStr = this.randomString(32)
        this.secretKeyStr = this.randomString(20)
        this.drinksStr = []
        for (let j = 0, k = 0; j < nRow; j++) {
            this.drinksStr += (j + 1)
            for (let i = 0; i < nCol; i++) {
                this.drinksStr += this.givenToLetter[this.seats[k++].given]
            }
        }
        this.calcPrizeMax ()
    },

    createSeat (row, col, given) {
        let index = this.getIndex (row, col)

        return {
            row: row,
            col: col,
            given: given,               //drink that seat prefer, can be 'Tea', 'Coffee', 'TeaCoffee'

            index: index,               //index of cell in cells array
            served: false,              //seat was served
            isQuestionTea: false,       //was ordered tea
            isQuestionCoffee: false,    //was ordered coffee
            isQuestionTeaCoffee: false  //was ordered tea-coffee
        }
    },

    getIndex(j, i)  {return j * game.nCol + i},
    getRow (ind)    {return Math.floor(ind / game.nCol)},
    getCol (ind)    {return ind % game.nCol},

    getSeatName (ind)  {
        const letters = 'ABCDEFGHIJKLM'
        const lettersBuisness = 'ACDF'

        return  (this.getRow (ind)+1) + ((this.nCol === 4) ? lettersBuisness : letters).charAt(this.getCol (ind))
    }
}

export default game