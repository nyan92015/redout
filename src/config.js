import { LobbyClient } from 'boardgame.io/client';

export const SERVER_URL = 'https://redout.onrender.com';
export const gameName = 'tic-tac-toe';
export const lobbyClient = new LobbyClient({ server: SERVER_URL });
