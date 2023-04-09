let count = 0
let operationPlus = {
    render_plus_card(task, dinner){
        let content = `
        <div class="card mt-2" id="plus${count++}" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${task}</h5>
                <p class="card-text">${dinner}</p>
                <a href="#" class="btn btn-danger">Delete</a>
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

    percentage_operation(Current_money, Incoming_money){
        let total_percentage = String(((Incoming_money * 100) / Current_money).toFixed(2))
        let convertion = total_percentage.split('')
        convertion.unshift('%')
        return (convertion.join(''))
    },

    render_operation(Current_money,Incoming_money){
        let format_current = Current_money.replace('$',' ')
        let total = parseInt(format_current.trim()) + parseInt(Incoming_money) 
        let totalParse = this.parse_operation(total)
        let percentage = this.percentage_operation(parseInt(format_current.trim()), parseInt(Incoming_money))
        return [percentage, totalParse]
    }    
}

self.addEventListener('message', e => { 
    postMessage(
        [
         operationPlus[`${e.data.module[0]}`](e.data.resources[1], e.data.resources[0]), 
         operationPlus[`${e.data.module[1]}`](e.data.resources[2],e.data.resources[0])   
        ])    
})
