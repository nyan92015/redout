import { ActivePlayers, INVALID_MOVE } from 'boardgame.io/core';

const NUM_CARDS_IN_HAND = 5;

function initializeHand(playerID) {
  // 5種類のカード (赤ドクロ、白ドクロ、黒ドクロ、白カード、黒カード) を用意する
  const cards = [
    {
      name: 'red_skull',
      id: playerID * NUM_CARDS_IN_HAND + 1,
    },
    {
      name: 'white_skull',
      id: playerID * NUM_CARDS_IN_HAND + 2,
    },
    {
      name: 'black_skull',
      id: playerID * NUM_CARDS_IN_HAND + 3,
    },
    {
      name: 'white_card',
      id: playerID * NUM_CARDS_IN_HAND + 4,
    },
    {
      name: 'black_card',
      id: playerID * NUM_CARDS_IN_HAND + 5,
    },
  ];
  return cards;
}

function dealHands({ G }) {
  // 手札が空なら配り直す
  if (G.cardCount === 0) {
    G.playerData[0].hands = initializeHand(0);
    G.playerData[1].hands = initializeHand(1);
    G.cardCount = 10;
  }
}

function playCard({ G }, cardID, cardName, playerID) {
  G.playerData[playerID].isWaiting = true;
  G.next = 'judge';
  G.playerData[playerID].roundCardID = cardID;
  G.playerData[playerID].roundCard = cardName;
}

function judgeWinner(G, events) {
  console.log(G);
  // 勝敗条件：どちらかが3ポイント先取
  if (G.playerData[0].score >= 3) {
    events.endGame({ winner: 0 });
  } else if (G.playerData[1].score >= 3) {
    events.endGame({ winner: 1 });
  }
}

function deleteCard(G) {
  G.playerData[0].hands = G.playerData[0].hands.map((handCard) =>
    handCard && handCard.id === G.playerData[0].roundCardID ? null : handCard,
  );

  G.playerData[1].hands = G.playerData[1].hands.map((handCard) =>
    handCard && handCard.id === G.playerData[1].roundCardID ? null : handCard,
  );

  G.playerData[0].roundCard = null;
  G.playerData[1].roundCard = null;
  G.playerData[0].roundCardID = null;
  G.playerData[1].roundCardID = null;
  G.cardCount -= 2;
}

function reset({ G, events }) {
  judgeWinner(G, events);
  deleteCard(G);
  G.round.winner = 0;
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
  G.playerData[0].isWaiting = true;
  G.playerData[1].isWaiting = true;
  G.round.winner = winner;
  G.next = 'resolve';
}

function giveUp({ events }, playerID) {
  events.endGame({ winner: playerID });
}

function unlockWaiting({ G }, playerID) {
  G.playerData[playerID].isWaiting = false;
}
function checkWaiting({ G, events }) {
  if (!G.playerData[0].isWaiting && !G.playerData[1].isWaiting)
    events.endPhase();
}

export const RedOut = {
  name: 'redout',
  setup: () => ({
    message: Array(2).fill(null),
    round: {
      winner: 0,
    },
    cardCount: 10,
    playerData: Array.from({ length: 2 }, (_, index) => ({
      hands: initializeHand(index), // index を引数として渡す
      roundCardID: null,
      roundCard: null,
      score: 0,
      isWaiting: true,
    })),
    next: '',
  }),
  phases: {
    draw: {
      start: true,
      moves: {dealHands, giveUp},
      onBegin: dealHands,
      endIf: ({ G }) => {
        return G.cardCount > 0;
      },
      next: 'play',
    },

    play: {
      moves: { playCard, unlockWaiting, giveUp },
      turn: {
        activePlayers: ActivePlayers.ALL,
      },
      endIf: ({ G }) => {
        if (
          G.playerData !== null &&
          G.playerData[0].roundCard !== null &&
          G.playerData[1].roundCard !== null
        ) {
          return true;
        }
        return false;
      },
      next: 'waiting',
    },

    judge: {
      moves: {judgeRoundWinner, giveUp},
      onBegin: judgeRoundWinner,
      endIf: ({ G }) => {
        return (
          G.round.winner &&
          G.playerData[0].isWaiting &&
          G.playerData[1].isWaiting
        );
      },
      next: 'waiting',
    },

    resolve: {
      moves: {reset, giveUp},
      onBegin: reset,
      endIf: ({ G }) => {
        if (
          G.playerData !== null &&
          G.playerData[0].roundCard === null &&
          G.playerData[1].roundCard === null &&
          !G.round.winner
        ) {
          return true;
        }
        return false;
      },
      next: 'draw',
    },
    waiting: {
      moves: { unlockWaiting, checkWaiting, giveUp },
      turn: {
        activePlayers: ActivePlayers.ALL,
      },
      onBegin: checkWaiting,
      endIf: ({ G }) => {
        return !G.playerData[0].isWaiting && !G.playerData[1].isWaiting;
      },
      next: ({ G }) => {
        return G.next ? G.next : 'draw';
      },
    },
  },
};
