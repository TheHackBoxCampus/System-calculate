import config from "../storage/config.js"

let btnSubmit = document.querySelector('#submit_task')
let renevuOrExpense = document.querySelector('#select_option')
let inputTaks = document.querySelector('#taks')
let inputDinner = document.querySelector('#dinner')
let price = document.querySelector('#price')
let renevu = document.querySelector('#renevu')
let div_renevus = document.querySelector('#div_renevus')
let div_expenses = document.querySelector('#div_expenses')
let percentage = document.querySelector('#percentage')
let expenses = document.querySelector('#expenses')
let cards_plus = [], count_plus = 0
let cards_less = [], count_less = 0

export default {
    data: {
        div_expenses,
        div_renevus
    },
    insertDatasCalculated(conf, bu, pe){
        conf.setItemLocalStorageForElement('Budget', bu)
        conf.setItemLocalStorageForElement('percentage', pe)
        conf.setItemLocalStorageForElement('expenses', bu)
    },
    insertLocalStorageCards(conf, arr,name_card) {
        conf.setItemLocalStorageForElement(name_card, arr)
    },

    plus(){
        const wsPlus = new Worker('src/workers/wsPlus.js')  
        wsPlus.postMessage({module: ['render_operation', 'render_plus_card'], resources:[inputDinner.value, price.innerHTML, inputTaks.value]}) 
        wsPlus.addEventListener('message', r => {
            let card = {[`${count_plus++}`] : r.data[1]}
            cards_plus.push(card)
            this.insertLocalStorageCards(config, cards_plus, 'cards-plus')
            this.insertDatasCalculated(config, r.data[0][0], r.data[0][1])
            // ----------------------------------- 
            price.innerHTML = r.data[0][1]
            renevu.innerHTML = r.data[0][1]
            // ----------------------------------- 
            div_renevus.insertAdjacentHTML('beforeend', r.data[1])
            wsPlus.terminate()
        })
    },

    less(){
        const wsLess = new Worker('src/workers/wsLess.js')
        wsLess.postMessage({module: ['render_operation', 'render_less_card'],resources:[inputDinner.value, price.innerHTML, inputTaks.value]})  
        wsLess.addEventListener('message', r => {
            let card = {[`${count_less++}`] : r.data[1]}
            cards_less.push(card)
            this.insertLocalStorageCards(config, cards_less, 'cards-less')
            this.insertDatasCalculated(config, r.data[0][0], r.data[0][1])
            // ----------------------------------- 
            price.innerHTML = r.data[0][0]
            expenses.innerHTML = price.innerHTML
            // ----------------------------------- 
            percentage.innerHTML = r.data[0][1]
            div_expenses.insertAdjacentHTML('beforeend', r.data[1])
            wsLess.terminate()
        }) 
    },
    
    render_option(option){
        option == '+' ? this.plus() : this.less()
    },

    render_operation() {btnSubmit.addEventListener('click', () => this.render_option(renevuOrExpense.value))}
}