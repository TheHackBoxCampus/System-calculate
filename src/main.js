import minMain from "./components/minMain.js";
import minOperationMain from "./components/minOperationMain.js";

minMain.render_cards_localStorage(minOperationMain.data.renevus, 'cards-plus', 'deletePlus')
minMain.render_cards_localStorage(minOperationMain.data.expenses,'cards-less', 'deleteLess')
minMain.render_budgets_localStorage()
minOperationMain.render_operation()

minOperationMain.removeDinner(minOperationMain.data.arrs[1], {
    data: {
        item: 'cards-plus',
        id: '#deletePlus',
        acms: 'renevus'
    }
})

minOperationMain.removeDinner(minOperationMain.data.arrs[0], {
    data: {
        item: 'cards-less',
        id: '#deleteLess',
        acms: 'expenses'
    }
})

minOperationMain.updateStateGraphics({data: {renevus: minOperationMain.data.infoGraphics[0], expenses: minOperationMain.data.infoGraphics[1]}})





