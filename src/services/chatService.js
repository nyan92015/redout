import { TicTacToeClient } from "../config";

export async function sendWelcomeMessage(playerName) {
    TicTacToeClient.sendChatMessage(`${playerName}が参加しました！`)
}
