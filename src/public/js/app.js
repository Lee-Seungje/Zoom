const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

let roomName = '';

room.hidden = true;

const showRoom = () => {
    welcome.hidden = true;
    room.hidden = false;
    const title = room.querySelector('h3');
    title.innerText = 'Room ' + roomName;
};

const handleSubmit = (event) => {
    event.preventDefault();
    const input = form.querySelector('input');
    socket.emit('enter_room', input.value, showRoom);
    roomName = input.value;
    input.value = '';
};

form.addEventListener('submit', handleSubmit);
