import { LobbyClient } from 'boardgame.io/client';

//https://redout.onrender.com/
//http://localhost:8000
export const SERVER_URL = 'http://localhost:8000';
export const gameName = 'redout';
export const lobbyClient = new LobbyClient({ server: SERVER_URL });
