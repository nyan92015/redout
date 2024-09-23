import { TicTacToeClient } from "../config";

export async function sendWelcomeMessage(playerName) {
    const match = await TicTacToeClient.sendChatMessage(`${playerName}が参加しました！`)
    return match;
}
