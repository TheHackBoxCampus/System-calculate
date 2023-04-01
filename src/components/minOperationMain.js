let btnSubmit = document.querySelector('#submit_task')
let renevuOrExpense = document.querySelector('#select_option')
let inputTaks = document.querySelector('#task')
let inputDinner = document.querySelector('#dinner')
let price = document.querySelector('#price')
let renevu = document.querySelector('#renevu')

export default {
    plus(){
        const wsPlus = new Worker('src/workers/wsPlus.js')  
        wsPlus.postMessage({module: 'render_operation', resources:[inputDinner.value, price.innerHTML]}) 
        wsPlus.addEventListener('message', r => {
            price.innerHTML = r.data
            renevu.innerHTML = price.innerHTML
        })
    },

    less(){
        const wsLess = new Worker('src/workers/wsLess.js')
        wsPlus.postMessage({module: 'render_operation',resources:[inputDinner.value, price.value]})    

    },
    
    render_option(option){
        option == '+' ? this.plus() : this.less()
    },

    render_operation() {btnSubmit.addEventListener('click', () => this.render_option(renevuOrExpense.value))}
}