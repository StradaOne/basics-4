function showVerticalMessage(string) {
  let str = string.toUpperCase().slice(0, 7)
  for (const letter of str) {
    if (letter === str[0]) {
      console.log(letter)
    } else {
      console.log(letter.toLowerCase())
    }
  }
}
showVerticalMessage('stradaaaa')
