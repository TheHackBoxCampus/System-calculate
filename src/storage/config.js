export default {
    header_text(){
        localStorage.setItem('header', JSON.stringify({
            data:{ 
                header: {
                    title: 'Presupuesto Disponible',
                    price: '$0',
                    renevu: '$0',
                    Expenses: '$0',
                    percentage: '%0.00'
                }
            },
        }))
    }       
}