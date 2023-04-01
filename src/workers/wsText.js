let wsText = {
    render_text(data) {
        return (
        [
        data.title,
        data.price,
        data.renevu,
        data.Expenses,
        data.percentage
        ])
    }    
}


self.addEventListener('message', e => {
    postMessage(wsText[`${e.data.module}`](e.data.resources))
})
