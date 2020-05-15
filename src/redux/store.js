let constData = {
    nRow: 12,
    nCol: 6,

    nPreferTea: 36,
    nPreferCoffee: 18,
    nPreferWater: 18,

    prizeTea: 2,
    prizeCoffee: 4,
    prizeTeaCoffee: 1,
}

let game = {
    onClickHint () {
        game.hintChecked = !game.hintChecked
        game.rerender ()
    },

    isPass (col, nCol) {
        const passes = [
        [1, 1],     //nCol = 0
        [1, 1],     //nCol = 1
        [1, 1],     //nCol = 2
        [1, 1],     //nCol = 3
        [2, 2],     //nCol = 4
        [3, 3],     //nCol = 5
        [3, 3],     //nCol = 6
        [2, 5],     //nCol = 7
        [2, 6],     //nCol = 8
        [3, 6],     //nCol = 9
        [3, 7],     //nCol = 10
        [3, 8],     //nCol = 11
        [3, 9],    //nCol = 12
         ]
        if (passes[nCol][0] === col ||
            passes[nCol][1] === col) return true
        else return false
    },
    isSeatEnabled  (row, col)  {
        let ind = this.getIndex(row, col)

        let result = false
        if (!this.seats[ind].served &&
            (row === this.activeRow ||
             (row === (this.activeRow+1) && (this.nCol-this.nServedInRow) <= 2))) result = true

        if (this.gameEnded) result = false
        return result
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

        if (seat.given === 'Water') game.prize = 0
        else if (seat.isQuestionTeaCoffee) game.prize += game.prizeTeaCoffee
        else if (seat.isQuestionTea && seat.given === 'Tea') game.prize += game.prizeTea
        else if (seat.isQuestionCoffee && seat.given === 'Coffee') game.prize += game.prizeCoffee
        else game.prize += 0

        if (row !== game.activeRow) {
            game.activeRow = row
            game.nServedInRow = 0
        }
        game.nServedInRow++
        if (game.nServedInRow === game.nCol) {
            game.nServedInRow = 0
            game.activeRow++
        }
        game.nextServed = undefined
        game.rerender()
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

        //Error analizing
        if (nPreferTea + nPreferCoffee + nPreferWater !== nRow * nCol) {
            alert ('Sum of prefers must be equal number of seats')
            return
        }
        if (nCol > 12) {alert ('Number of seats in row is too large'); return}
        if (nRow > 100) {alert ('Number of rows is too large'); return}
        if (nCol <=0 || nRow <= 0) {alert ('The parameter must be positive'); return}
        if (nCol <=0 || nRow <= 0) {alert ('The parameter must be positive'); return}
        const maxWaterInRow = [0,
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
            7,  //for 7 seat in raw
        ]
        if (nPreferWater >= maxWaterInRow[nCol]*nRow) {alert ('The number of Water Answers is too large'); return}

        this.initialize ({
            nRow: nRow,
            nCol: nCol,

            nPreferTea: nPreferTea,
            nPreferCoffee: nPreferCoffee,
            nPreferWater: nPreferWater,

            prizeTea: prizeTea,
            prizeCoffee: prizeCoffee,
            prizeTeaCoffee: prizeTeaCoffee,
        })
        this.rerender ()
    },

    onClickEndGame () {
        game.hintChecked = true
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

    onChangeRow(body)           {this.nRowStr = body;           this.rerender()},
    onChangeCol(body)           {this.nColStr = body;           this.rerender()},
    onChangePreferTea(body)     {this.nPreferTeaStr = body;     this.rerender()},
    onChangePreferCoffee(body)  {this.nPreferCoffeeStr = body;  this.rerender()},
    onChangePreferWater(body)   {this.nPreferWaterStr = body;   this.rerender()},
    onChangePrizeTea(body)      {this.prizeTeaStr = body;       this.rerender()},
    onChangePrizeCoffee(body)   {this.prizeCoffeeStr = body;    this.rerender()},
    onChangePrizeTeaCoffee(body){this.prizeTeaCoffeeStr = body; this.rerender()},

    create (rerender) {
        this.rerender = rerender
        this.initialize (constData)
    },

    initialize(data) {
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
        this.seats = []

        let prefer = []
        for (let i = 0; i < this.nPreferTea; i++)    prefer.push('Tea')
        for (let i = 0; i < this.nPreferCoffee; i++) prefer.push('Coffee')

        //0. Проверяем корректность данных
        if (this.nPreferWater !== nRow*1.5) alert('Improper number of Water Answers')

        //1. Создаем массив one-two: сначала nRow/2 единиц, потом nRow двоек
        let one_two = []
        for (let i = 0; i < nRow/2; i++) one_two.push (1)
        for (let i = 0; i < nRow/2; i++) one_two.push (2)
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
        let preferRand = []
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
                let seat = this.createSeat (j, i, rowRand[i])
                this.seats.push (seat)
            }
        }

/*
        //Вариант случайной выборки из массива prefer с ограничением:
        //в одной секции кресел (между проходами) не допускаются 2 воды рядом.
        //
        this.seats = []

        let prefer = []
        for (let i = 0; i < this.nPreferTea; i++)    prefer.push('Tea')
        for (let i = 0; i < this.nPreferCoffee; i++) prefer.push('Coffee')
        for (let i = 0; i < this.nPreferWater; i++)  prefer.push('Water')

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
*/

/*
        //Вавриант абсолютно случайной выборки из массива prefer[]
        //
        this.seats = []

        let prefer = []
        for (let i = 0; i < this.nPreferTea; i++)    prefer.push('Tea')
        for (let i = 0; i < this.nPreferCoffee; i++) prefer.push('Coffee')
        for (let i = 0; i < this.nPreferWater; i++)  prefer.push('Water')

        for (let j = 0; j < nRow; j++) {
            for (let i = 0; i < nCol; i++) {
                let ind = Math.floor(Math.random() * prefer.length)
                let given = prefer[ind]
                prefer.splice(ind, 1)          //delete element from array

                let seat = this.createSeat (j, i, given)
                this.seats.push (seat)
            }
        }
*/
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

    getSeatName (ind) {
        let row = this.getRow (ind)
        let col = this.getCol (ind)
        let text = row + 1
        switch (col) {
            case 0:text += 'A';break
            case 1:text += 'B';break
            case 2:text += 'C';break
            case 3:text += 'D';break
            case 4:text += 'E';break
            case 5:text += 'F';break
            case 6:text += 'G';break
            case 7:text += 'H';break
            case 8:text += 'I';break
            case 9:text += 'J';break
            case 10:text += 'K';break
            case 11:text += 'L';break
            case 12:text += 'M';break
            default:text += ''
        }
        return text
    }
}

export default game