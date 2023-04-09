let count = 0
let operationLess = {
    render_less_card(task, dinner) {
        let content = `
        <div class="card mt-2" id="less${count++}" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title text-danger">${task}</h5>
                <p class="card-text text-danger">${dinner}</p>
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
        let Current_value_parse = parseInt(format_current.trim())
        let total = Current_value_parse - parseInt(Incoming_money) 
        let total_parse = this.parse_operation(total)
        return [total_parse, this.percentage_operation(Current_value_parse, parseInt(Incoming_money))]
    } 
}

self.addEventListener('message', e => {
    postMessage(
        [
            operationLess[`${e.data.module[0]}`](e.data.resources[1], e.data.resources[0]),
            operationLess[`${e.data.module[1]}`](e.data.resources[2], e.data.resources[0])
        ])
})