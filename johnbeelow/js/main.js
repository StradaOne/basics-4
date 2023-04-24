import { UI_ELEMENTS } from '../module/ui_elements.js'
import { OPERATIONS } from '../module/logic_calc.js'
import { calcSum } from '../module/logic_calc.js'
import { updateHistoryConstructor } from '../module/logic_render.js'
import { getResultConstructor } from '../module/logic_render.js'

UI_ELEMENTS.BUTTON_RESULT.addEventListener('click', getResultConstructor)
