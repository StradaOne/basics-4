import { getHistoryChat } from './api.js'
import { updateScroll } from './ui.js'
import { isEmptyArray } from './validation.js'
import { SYSTEM_MESSAGE } from './confing.js'
import {
  renderSystemMessage,
  parseMessage,
} from './message.js'
import { TYPE } from './confing.js'

const { MESSAGE } = TYPE
const { STORY_IS_UPLOADED } = SYSTEM_MESSAGE

let paginatedData = []
let start = 0
let end = 20
let isSucces = false

const appendHistory = async () => {
  const data = await getHistoryChat()
  const counter = 20

  const showList = () => {
    paginatedData = data.reverse().slice(start, end)
    paginatedData.map((messages) =>
      parseMessage(messages, MESSAGE.DOWN)
    )

    start += counter
    end += counter

    if (isEmptyArray(paginatedData) && !isSucces) {
      renderSystemMessage(STORY_IS_UPLOADED)
      isSucces = true
    }

    if (start === counter) {
      updateScroll()
    }
  }

  showList()
}

export { appendHistory }
