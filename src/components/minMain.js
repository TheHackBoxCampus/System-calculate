import config from "../storage/config.js"

export default {
    innerText(res_worker){
        let title = document.querySelector('#title')
        let price = document.querySelector('#price')
        let renevu = document.querySelector('#renevu')
        let expenses = document.querySelector('#expenses')
        let percentage = document.querySelector('#percentage')
        
        return (
        title.innerHTML += res_worker[0],
        price.innerHTML += res_worker[1],
        renevu.innerHTML += res_worker[2],
        expenses.textContent += res_worker[3],
        percentage.innerHTML += res_worker[4])
    },

    render_text(){ 
        config.header_text()
        Object.assign(this, JSON.parse(localStorage.getItem('header')))
        const ws = new Worker('src/workers/wsText.js')
        ws.postMessage({resources: this.data.header,  module: 'render_text'})
        ws.addEventListener('message', r => this.innerText(r.data))
    }    
}