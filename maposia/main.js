let room = {
  number: 23,
}

let meetup = {
  title: 'Совещание',
  occupiedBy: [{ name: 'Иванов' }, { name: 'Петров' }],
  place: room,
}

// цикличные ссылки
room.occupiedBy = meetup
meetup.self = meetup

alert(
  JSON.stringify(meetup, function replacer(key, value) {
    alert('ключ ' + key + ' значение ' + value)
    return key != '' && value == meetup ? undefined : value
  })
)
