import { client } from "../config";

export async function sendWelcomeMessage(playerName, matchData) {
    client.sendChatMessage({message: `${playerName}が参加しました！`, matchID: matchData.matchID})
}
