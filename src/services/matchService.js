import { gameName, lobbyClient } from '../config';

/**
 * ゲームを探す関数
 */
export async function findAvailableMatch() {
  try {
    const { matches } = await lobbyClient.listMatches(gameName);

    // 空いている席があるマッチを探す
    const availableMatch = matches.find(
      (match) => match.players.some((player) => !player.name)
    );

    if (availableMatch) {
      const openSeat = availableMatch.players.find((player) => !player.name);
      return { matchID: availableMatch.matchID, playerID: String(openSeat.id) };
    }

    // 空いているマッチがない場合
    return null;
  } catch (error) {
    console.error('Error finding match:', error);
    throw error;
  }
}

/**
 * 新しいゲームを作る関数
 */
export async function createNewMatch(numPlayers = 2) {
  try {
    const { matchID } = await lobbyClient.createMatch(gameName, { numPlayers });
    return { matchID, playerID: '0' }; 
  } catch (error) {
    console.error('Error creating match:', error);
    throw error;
  }
}

/**
 * ゲームに参加する関数
 */
export async function joinMatch(matchID, playerID, playerName) {
  try {
    const { playerCredentials } = await lobbyClient.joinMatch(gameName, matchID, {
      playerID,
      playerName,
    });
    return playerCredentials;
  } catch (error) {
    console.error('Error joining match:', error);
    throw error;
  }
}

/**
 * マッチから離れる関数
 */
export async function leaveMatch(matchID, playerID, playerCredentials) {
  try {
    await lobbyClient.leaveMatch(gameName, matchID, {
      playerID,
      credentials: playerCredentials,
    });
    console.log(`Player ${playerID} has left match ${matchID}`);
  } catch (error) {
    console.error('Error leaving match:', error);
    throw error;
  }
}

/**
 * マッチ情報を取得する関数
 */
export async function getMatch(matchID) {
  try {
    const match = await lobbyClient.getMatch(gameName, matchID);
    return match;
  } catch (error) {
    console.error('Error getting match:', error);
    throw error;
  }
}
