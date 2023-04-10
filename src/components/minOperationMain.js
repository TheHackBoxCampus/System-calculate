import config from "../storage/config.js"

let btnSubmit = document.querySelector('#submit_task')
let renevuOrExpense = document.querySelector('#select_option')
let inputTaks = document.querySelector('#taks')
let inputDinner = document.querySelector('#dinner')
let price = document.querySelector('#price')
let renevu = document.querySelector('#renevu')
let div_renevus = document.querySelector('.cards_renevus')
let div_expenses = document.querySelector('.cards_expenses')
let percentage = document.querySelector('#percentage')
let expenses = document.querySelector('#expenses')
let cards_plus = [], count_plus = 0
let cards_less = [], count_less = 0
let acc_expenses = 0

export default {
    data: {
        expenses: div_expenses,
        renevus: div_renevus
    },

    removeDinner(item) {
        let buttons = document.querySelectorAll('#delete')
        if(!buttons)return
        
        buttons.forEach(button => {
            button.addEventListener('click', t => {
                let remove_child = t.target.parentNode
                t.target.parentNode.parentNode.remove(remove_child)
                localStorage.removeItem(item)
            })            
        })
    },

    insertDatasCalculated(conf, bu, pe, ex){
        conf.setItemLocalStorageForElement('Budget', bu)
        conf.setItemLocalStorageForElement('percentage', pe)
        conf.setItemLocalStorageForElement('renevus', bu)
        !ex ? false : conf.setItemLocalStorageForElement('expenses', ex)
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
            this.insertDatasCalculated(config, r.data[0][1], r.data[0][0])
            // ----------------------------------- 
            price.innerHTML = r.data[0][1]
            renevu.innerHTML = r.data[0][1]
            // ----------------------------------- 
            percentage.innerHTML = r.data[0][0]
            div_renevus.insertAdjacentHTML('beforeend', r.data[1])
            this.removeDinner('cards-plus')
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
            acc_expenses += JSON.parse(localStorage.getItem('expenses')) + +r.data[0][2]
            this.insertDatasCalculated(config, r.data[0][0], r.data[0][1], acc_expenses)
            // ----------------------------------- 
            price.innerHTML = r.data[0][0]
            expenses.innerHTML = "$"+acc_expenses.toString()
            // ----------------------------------- 
            percentage.innerHTML = r.data[0][1]
            div_expenses.insertAdjacentHTML('beforeend', r.data[1])
            this.removeDinner('cards-less')
            wsLess.terminate()
        }) 
    },
    
    render_option(option){
        option == '+' ? this.plus() : this.less()
    },

    render_operation() {btnSubmit.addEventListener('click', () => this.render_option(renevuOrExpense.value))}
}
