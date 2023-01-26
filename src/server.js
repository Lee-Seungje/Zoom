import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log('Listening on http://localhost:3000');

const server = http.createServer(app); // 서버 만들기(http 서버)

const wss = new WebSocket.Server({ server }); // 웺 소켓 서버를 만들고 http 서버를 전달해준다 이렇게 하면 같은 서버에서 http, websocket 모두 돌릴 수 있다

server.listen(3000, handleListen);
