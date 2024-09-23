import React, { useEffect, useState } from 'react';
import ChatBoard from './components/ChatBoard';

export function TicTacToeBoard({ ctx, G, moves, sendChatMessage, chatMessages, playerID }) {
  const [showBoard, setShowBoard] = useState(false);
  // プレイヤーIDが '1' の場合に参加メッセージを送信
  if (playerID === '1') sendChatMessage({ id : 'c11' });
  console.log(chatMessages)
  useEffect(() => {
    // chatMessagesの変更を監視
    if (chatMessages.length > 0) {
      const latestMessage = chatMessages[chatMessages.length - 1];
      // メッセージの送信者が自分以外ならボードを表示
      if (latestMessage.id === 'c11') {
        if(playerID === '0') sendChatMessage({ id : 'c10' })
        setShowBoard(true);
      }
    }
  }, [chatMessages, playerID, sendChatMessage]);

  const onClick = (id) => moves.clickCell(id);
  let winner = '';
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  const cellStyle = {
    border: '1px solid #555',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  };

  let tbody = [];
  for (let i = 0; i < 3; i++) {
    let cells = [];
    for (let j = 0; j < 3; j++) {
      const id = 3 * i + j;
      cells.push(
        <td key={id}>
          {G.cells[id] ? (
            <div style={cellStyle}>{G.cells[id]}</div>
          ) : (
            <button style={cellStyle} onClick={() => onClick(id)} />
          )}
        </td>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <div>
      <ChatBoard chatMessages={chatMessages} sendChatMessage={sendChatMessage} />
      {showBoard && (
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
      )}
      {winner}
    </div>
  );
}