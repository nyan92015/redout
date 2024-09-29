import { ActivePlayers, INVALID_MOVE } from 'boardgame.io/core';

const NUM_CARDS_IN_HAND = 5;

function initializeHand() {
  // 5種類のカード (赤ドクロ、白ドクロ、黒ドクロ、白カード、黒カード) を用意する
  const cards = ['red_skull', 'white_skull', 'black_skull', 'white_card', 'black_card'];
  return cards;
}

function dealHands({ G }) {
  // 手札が空なら配り直す
  if (G.playerData[0].hands.length === 0) {
    G.playerData[0].hands = initializeHand();
    G.playerData[1].hands = initializeHand();
  }
}

function playCard({ G }, card, playerID) {
  G.playerData[playerID].roundCard = card;
}

function judgeWinner(G, events) {
  // 勝敗条件：どちらかが3ポイント先取
  if (G.playerData[0].score >= 3) {
    events.endGame({ winner: 0 });
  } else if (G.playerData[1].score >= 3) {
    events.endGame({ winner: 1 });
  }
}

function deleteCard(G) {
  G.playerData[0].hands = G.playerData[0].hands.filter(
    (handCard) => handCard !== G.playerData[0].roundCard,
  );
  G.playerData[1].hands = G.playerData[1].hands.filter(
    (handCard) => handCard !== G.playerData[1].roundCard,
  );
  G.playerData[0].roundCard = null;
  G.playerData[1].roundCard = null;
}

function reset({ G, events }) {
  judgeWinner(G, events);
  deleteCard(G);
  G.round.winner = null;
}

function judgeRoundWinner({ G }) {
  // アウト判定のロジック
  const player1Card = G.playerData[0].roundCard;
  const player2Card = G.playerData[1].roundCard;
  let winner = null;
  if (
    player1Card === 'red_skull' &&
    (player2Card === 'white_skull' || player2Card === 'black_skull')
  ) {
    winner = 1;
  } else if (
    player2Card === 'red_skull' &&
    (player1Card === 'white_skull' || player1Card === 'black_skull')
  ) {
    winner = 2;
  } else if (player1Card === 'white_skull' && player2Card === 'white_card') {
    winner = 1;
  } else if (player2Card === 'white_skull' && player1Card === 'white_card') {
    winner = 2;
  } else if (player1Card === 'black_skull' && player2Card === 'black_card') {
    winner = 1;
  } else if (player2Card === 'black_skull' && player1Card === 'black_card') {
    winner = 2;
  } else winner = 3;

  if (winner === 1) {
    G.playerData[0].score += 1;
  } else if (winner === 2) {
    G.playerData[1].score += 1;
  }
  G.round.winner = winner;
}

export const RedOut = {
  name: 'redout',
  setup: () => ({
    message: Array(2).fill(null),
    round: {
      winner: null,
    },
    playerData: Array(2).fill({
      hands: initializeHand(),
      roundCard: null,
      score: 0,
    }),
  }),
  phases: {
    draw: {
      start: true,
      onBegin: dealHands,
      endIf: ({ G }) => {
        return G.playerData[0].hands.length > 0 && G.playerData[1].hands.length > 0;
      },
      next: 'play', // drawフェーズが終了したらplayフェーズに進む
    },

    play: {
      moves: { playCard },
      turn: {
        activePlayers: ActivePlayers.ALL,
      },
      endIf: ({ G }) => {
        // 両プレイヤーがカードを選んでいるかを確認
        if (
          G.playerData &&
          G.playerData[0].roundCard !== null &&
          G.playerData[1].roundCard !== null
        ) {
          return true; // フェーズを終了
        }
        return false;
      },
      next: 'judge', // playフェーズが終了したらjudgeフェーズに進む
    },

    judge: {
      onBegin: judgeRoundWinner,
      endIf: ({ G }) => {
        return G.round.winner;
      },
      next: 'resolve',
    },

    resolve: {
      onBegin: reset,
      endIf: ({ G }) => {
        if (
          G.playerData &&
          G.playerData[0].roundCard === null &&
          G.playerData[1].roundCard === null
        ) {
          return true; // フェーズを終了
        }
        return false;
      },
      next: 'draw',
    },
  },
};
