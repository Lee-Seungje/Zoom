const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

let roomName = '';

room.hidden = true;

const addMessage = (message) => {
    const ul = room.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = message;
    ul.appendChild(li);
};

const handleMessageSubmit = (event) => {
    event.preventDefault();
    const input = room.querySelector('#msg input');
    socket.emit('new_message', input.value, roomName, () => {
        addMessage(`You: ${input.value}`);
        input.value = '';
    });
};

const showRoom = () => {
    welcome.hidden = true;
    room.hidden = false;
    const title = room.querySelector('h3');
    title.innerText = 'Room ' + roomName;
    const msgForm = room.querySelector('#msg');
    msgForm.addEventListener('submit', handleMessageSubmit);
};

const handleSubmit = (event) => {
    event.preventDefault();

    const nicInput = form.querySelector('#nickName');
    socket.emit('nickname', nicInput.value);
    nicInput.value = '';

    const roomInput = form.querySelector('#roomName');
    socket.emit('enter_room', roomInput.value, showRoom);
    roomName = roomInput.value;
    roomInput.value = '';
};

form.addEventListener('submit', handleSubmit);

socket.on('welcome', (user, newCount) => {
    const title = room.querySelector('h3');
    title.innerText = 'Room ' + roomName + ' (' + newCount + ')';
    addMessage(user + ' Joined');
});

socket.on('bye', (left, newCount) => {
    const title = room.querySelector('h3');
    title.innerText = 'Room ' + roomName + ' (' + newCount + ')';
    addMessage(left + ' Left');
});

socket.on('new_message', addMessage);

socket.on('room_change', (rooms) => {
    const roomList = welcome.querySelector('ul');
    roomList.innerHTML = '';
    if (rooms.length === 0) {
        return;
    }
    rooms.forEach((room) => {
        const li = document.createElement('li');
        li.innerText = room;
        roomList.appendChild(li);
    });
});
