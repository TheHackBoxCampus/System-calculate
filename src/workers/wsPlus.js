let operationPlus = {
    render_plus_card(){
        let content = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        `
        return content
    },

    parse_operation(string_total) {
        let convertion = String(string_total).split('')
        convertion.unshift('$')
        return convertion.join('')
    },

    render_operation(Current_money,Incoming_money){
        let format_current = Current_money.replace('$',' ')
        let total = parseInt(format_current.trim()) + parseInt(Incoming_money) 
        return this.parse_operation(total)
    }    
}

self.addEventListener('message', e => { 
    postMessage(operationPlus[`${e.data.module}`](e.data.resources[1], e.data.resources[0]))    
})
