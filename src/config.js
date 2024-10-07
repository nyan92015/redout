import { LobbyClient } from 'boardgame.io/client';

//https://redout.onrender.com/
//http://localhost:8000
export const SERVER_URL = 'https://redout.onrender.com/';
export const gameName = 'redout';
export const lobbyClient = new LobbyClient({ server: SERVER_URL });
