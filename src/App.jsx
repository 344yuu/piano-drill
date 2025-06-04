import { useState, useEffect } from 'react';
import './App.css'; // CSSを使って位置を調整するため

const notes = [
  { name: 'C4', label: 'ド', position: 7 },
  { name: 'D4', label: 'レ', position: 6.5 },
  { name: 'E4', label: 'ミ', position: 6 },
  { name: 'F4', label: 'ファ', position: 5.5 },
  { name: 'G4', label: 'ソ', position: 5 },
  { name: 'A4', label: 'ラ', position: 4.5 },
  { name: 'B4', label: 'シ', position: 4 },
  { name: 'C5', label: 'ド', position: 3.5 },
];

export default function App() {
  const [currentNote, setCurrentNote] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    nextNote();
  }, []);

  const nextNote = () => {
    setSelectedKey(null);
    setMessage('');
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setCurrentNote(randomNote);
  };

  const handleKeyPress = (key) => {
    setSelectedKey(key);
    if (currentNote && key === currentNote.label) {
      setMessage('正解！🎉');
      setTimeout(() => {
        nextNote();
      }, 1000);
    } else {
      setMessage('不正解です。もう一度チャレンジしてください。');
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>音符ドリル</h1>

      <div className="staff-container">
       <img src="/piano-drill/g-clef.jpg" alt="五線譜" className="g-clef-image" />
        {currentNote && (
          <div
            className="note"
            style={{ top: `${currentNote.position * 10}px` }}
          >
            🎵
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        {['ド', 'レ', 'ミ', 'ファ', 'ソ', 'ラ', 'シ', 'ド'].map((keyName, i) => (
          <button key={i} onClick={() => handleKeyPress(keyName)} style={{ marginRight: '8px', marginBottom: '8px' }}>
            {keyName}
          </button>
        ))}
      </div>

      {selectedKey && <p>押した鍵盤: {selectedKey}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}
