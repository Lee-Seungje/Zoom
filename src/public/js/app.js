const socket = new WebSocket(`ws://${window.location.host}`); // 프론트에서 해줘야하는 연결

socket.addEventListener('open', () => {
    console.log('Connected to Server ✅');
});

socket.addEventListener('message', (message) => {
    console.log('New message: ', message.data);
});

socket.addEventListener('close', () => {
    console.log('Disconnected from Server ❌');
});

setTimeout(() => {
    socket.send('hello');
}, 10000);
