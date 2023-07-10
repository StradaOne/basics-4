import { getHistoryChat } from './api.js'
import { updateScroll } from './ui.js'
import { isEmptyArray } from './validation.js'
import { SYSTEM_MESSAGE } from './confing.js'
import { renderSystemMessage, parseHistoryMessage } from './message.js'

let paginatedData = []
let start = 0
let end = 20
let isSucces = false

const appendHistory = async () => {
  const data = await getHistoryChat()

  const showList = () => {
    paginatedData = data.reverse().slice(start, end)
    paginatedData.map((messages) => parseHistoryMessage(messages))

    start += 20
    end += 20

    if (isEmptyArray(paginatedData) && !isSucces) {
      renderSystemMessage(SYSTEM_MESSAGE.STORY_IS_UPLOADED)
      isSucces = true
    }

    if (start === 20) {
      updateScroll()
    }
  }

  showList()
}

export { appendHistory }
