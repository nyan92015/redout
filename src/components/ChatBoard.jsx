import React, { useState } from 'react';

const ChatBoard = ({ chatMessages, sendChatMessage }) => {
  const [message, setMessage] = useState('');

  // メッセージを送信するハンドラー
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      sendChatMessage(message); // メッセージを送信
      setMessage(''); // 入力フィールドをリセット
    }
  };

  return (
    <div>
      {/* メッセージ表示エリア */}
      <ul>
        {chatMessages.map((msg, index) => (
          <li key={index}>{msg}</li> // チャットメッセージをリストとして表示
        ))}
      </ul>

      {/* メッセージ入力と送信ボタン */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // 入力されたメッセージを状態に保持
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatBoard;
