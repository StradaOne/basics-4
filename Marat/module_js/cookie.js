function saveChatHistory(history){
    Cookies.set('chatHistory', JSON.stringify(history));
}

function loadChatHistory() {
    const history = Cookies.get('chatHistory');
    if(history) {
        return JSON.parse(history);
    }
    else {
        return []
    }
}

const chatHistory = loadChatHistory();

function addMessageToHistory(message) {
    chatHistory.push
}