// import { getCookie } from './cookies';

// export function openSocet() {
//   const socket = new WebSocket(`wss://edu.strada.one/websockets?${getCookie()}`);

//   socket.onopen = () => {
//     console.log('Соединение установлено можно отправлять данные');
//     // socket.send(JSON.stringify({ text: 'тесттест' }));
//   };

//   socket.onmessage = (event) => {
//     console.log(`данные получены ${event.data}`);
//   };
// }
