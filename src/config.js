import { LobbyClient } from 'boardgame.io/client';

export const SERVER_URL = 'http://localhost:8000';
export const gameName = 'tic-tac-toe';
export const lobbyClient = new LobbyClient({ server: SERVER_URL });


