let card = title => content => id => `
<div class="card mt-2" data-value="0" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title text-dark">${title}</h5>
        <p class="card-text text-dark">${content}</p>
        <a href="#" id=${id} class="btn btn-danger">Delete</a>
    </div>
</div>
` 

let info = [
document.querySelector('#price'),
document.querySelector('#renevu'),
document.querySelector('#expenses'),
document.querySelector('#percentage')]

export default {
    render_budgets_localStorage(){
        let types = ['Budget','renevus','expenses','percentage']
        
        for(let x = 0; x < types.length; x++){
            if(!localStorage.getItem(types[x])) return 
            //else
            let tpm = JSON.parse(localStorage.getItem(types[x]))
            info[x].innerHTML = tpm
        }
    },  

    render_cards_localStorage(div, name_item, id){
        if(localStorage.getItem(name_item) == null) return

        let cards = JSON.parse(localStorage.getItem(name_item))
        for(let x = 0; x < cards.length; x++) {
            if(cards[x] == null) continue

            let card_save = card(cards[x].task)(cards[x].dinner)(id)
            div.insertAdjacentHTML('beforeend', card_save)
        }
    },
}