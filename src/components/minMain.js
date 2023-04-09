let info = [
document.querySelector('#price'),
document.querySelector('#expenses'),
document.querySelector('#percentage')]

export default {
    render_budgets_localStorage(){
        let types = ['Budget','expenses', 'percentage']
        
        for(let x = 0; x < types.length; x++){
            if(!localStorage.getItem(types[x])) return 
            //else
            let tpm = JSON.parse(localStorage.getItem(types[x]))
            info[x].innerHTML = tpm
        }
    },  

    render_cards_localStorage(div, name_item){
        if(localStorage.getItem(name_item) == null) return

        let cards = JSON.parse(localStorage.getItem(name_item))
        for(let x = 0; x < cards.length; x++) div.insertAdjacentHTML('beforeend', cards[x][x])
    },
}