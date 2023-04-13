import { operationPlus } from "../workers/wsPlus.js"
import { operationLess } from "../workers/wsLess.js"
import config from "../storage/config.js"
import minGraphics from "./minGraphics.js"

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
let acc_expenses = !localStorage.getItem('expenses') ? 0 : JSON.parse(localStorage.getItem('expenses'))
let acc_renevus = !localStorage.getItem('renevus') ? 0 : JSON.parse(localStorage.getItem('renevus'))
let cards_plus = !localStorage.getItem('cards-plus') ? [] : JSON.parse(localStorage.getItem('cards-plus'))
let cards_less = !localStorage.getItem('cards-less') ? [] : JSON.parse(localStorage.getItem('cards-less'))

export default {
    data: {
        expenses: div_expenses,
        renevus: div_renevus,
        arrs: [cards_less, cards_plus],
        infoGraphics: [acc_renevus, acc_expenses]
    },

    updateStateGraphics({data}) {
        minGraphics.render_graphics(echarts, {data: {
            x: ['Ganancias', 'Egresos'],
            y: [data.renevus, data.expenses]
        }})
    },

    render_op(signe, current, incoming) {
        return signe == 'cards-plus' ? 
         operationLess.render_operation(current, incoming) :
         operationPlus.render_operation(current, incoming)
    },

    removeDinner(arr, {data}) {
        let buttons = document.querySelectorAll(data.id)
        if(!buttons)return

        for(let x = 0; x < buttons.length; x++){
            buttons[x].addEventListener('click', t => {
                let remove_child = t.target.parentNode
                t.target.parentNode.parentNode.remove(remove_child)
                let select = t.target.parentNode.children[0].innerHTML
                let item_price = t.target.parentNode.children[1].innerHTML
              
                for(let y = 0; y < arr.length; y++){
                    if(arr[y] == null) continue
                    else if(arr[y].task == select) {
                        delete arr[y]
                        let res = this.render_op(data.item,price.innerHTML,item_price)
                        price.innerHTML = res[0]
                        percentage.innerHTML = res[1]
                        if(data.acms == 'renevus') acc_renevus -= +res[2]
                        else {acc_renevus += +res[2], acc_expenses -= +res[2]}  
                        this.insertDatasCalculated(config, res[0], res[1])
                        this.insertLocalStorageCards(config, arr, data.item)
                        this.insertLocalStorageCards(config, acc_renevus, 'renevus')
                        this.insertLocalStorageCards(config, acc_expenses, 'expenses')
                        this.updateStateGraphics({data: {renevus: acc_renevus, expenses: acc_expenses}})
                    }
                }
            }) 
        }
    },

    insertDatasCalculated(conf, bu, pe){
        conf.setItemLocalStorageForElement('Budget', bu)
        conf.setItemLocalStorageForElement('percentage', pe)
    },
    insertLocalStorageCards(conf, content ,name_card) {
        conf.setItemLocalStorageForElement(name_card, content)
    },

    plus(){
        const wsPlus = new Worker('src/workers/wsPlus.js', {type:'module'})  
        wsPlus.postMessage({module: ['render_operation', 'render_plus_card'], resources:[inputDinner.value, price.innerHTML, inputTaks.value]}) 
        
        wsPlus.addEventListener('message', r => {
            let card = {task: inputTaks.value, dinner: inputDinner.value}
            cards_plus.push(card)
            acc_renevus += +r.data[0][2]
            this.insertLocalStorageCards(config, cards_plus, 'cards-plus')
            this.insertDatasCalculated(config, r.data[0][0], r.data[0][1])
            this.insertLocalStorageCards(config, acc_renevus, 'renevus')
            // ----------------------------------- 
            price.innerHTML = r.data[0][0]
            renevu.innerHTML = r.data[0][0]
            // ----------------------------------- 
            percentage.innerHTML = r.data[0][1]
            div_renevus.insertAdjacentHTML('beforeend', r.data[1])
            this.removeDinner(cards_plus, {data: {
                item: 'cards-plus',
                id: '#deletePlus',
                acms: 'renevus'
            }}, acc_renevus)
            this.updateStateGraphics({data: {renevus: acc_renevus, expenses: acc_expenses}})
            wsPlus.terminate()
        })
    },

    less(){
        const wsLess = new Worker('src/workers/wsLess.js', {type:'module'})
        wsLess.postMessage({module: ['render_operation', 'render_less_card'],resources:[inputDinner.value, price.innerHTML, inputTaks.value]})  
        wsLess.addEventListener('message', r => {
            let card = {task: inputTaks.value, dinner: inputDinner.value}
            acc_expenses += +r.data[0][2]
            acc_renevus -= +r.data[0][2]
            cards_less.push(card)

            this.insertLocalStorageCards(config, cards_less, 'cards-less')
            this.insertDatasCalculated(config, r.data[0][0], r.data[0][1])
            this.insertLocalStorageCards(config, acc_expenses, 'expenses')
            this.insertLocalStorageCards(config, acc_renevus, 'renevus')
            // ----------------------------------- 
            price.innerHTML = r.data[0][0]
            expenses.innerHTML = "$"+acc_expenses.toString()
            // ----------------------------------- 
            percentage.innerHTML = r.data[0][1]
            div_expenses.insertAdjacentHTML('beforeend', r.data[1])
            this.removeDinner(cards_less, {data: {
                item: 'cards-less',
                id: '#deleteLess',
                acms: 'expenses'
            }}, acc_expenses)
            this.updateStateGraphics({data: {renevus: acc_renevus, expenses: acc_expenses}})
            wsLess.terminate()
        }) 
    },
    
    render_option(option){
        option == '+' ? this.plus() : this.less()
    },

    render_operation() {btnSubmit.addEventListener('click', () => this.render_option(renevuOrExpense.value))}
}

