import minMain from "./components/minMain.js";
import minOperationMain from "./components/minOperationMain.js";

minMain.render_cards_localStorage(minOperationMain.data.div_renevus, 'cards-plus')
minMain.render_cards_localStorage(minOperationMain.data.div_expenses,'cards-less')
minMain.render_budgets_localStorage()
minOperationMain.render_operation()
