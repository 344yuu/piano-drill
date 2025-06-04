import { useState, useEffect } from 'react';

const trebleNotes = [
  { name: 'C4', label: 'ド' },
  { name: 'D4', label: 'レ' },
  { name: 'E4', label: 'ミ' },
  { name: 'F4', label: 'ファ' },
  { name: 'G4', label: 'ソ' },
  { name: 'A4', label: 'ラ' },
  { name: 'B4', label: 'シ' },
  { name: 'C5', label: 'ド' },
];

const bassNotes = [
  { name: 'C3', label: 'ド' },
  { name: 'D3', label: 'レ' },
  { name: 'E3', label: 'ミ' },
  { name: 'F3', label: 'ファ' },
  { name: 'G3', label: 'ソ' },
  { name: 'A3', label: 'ラ' },
  { name: 'B3', label: 'シ' },
  { name: 'C4', label: 'ド' },
];

export default function App() {
  const [clef, setClef] = useState('treble');
  const [currentNote, setCurrentNote] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [message, setMessage] = useState('');

  // クリフ切替時と初回にランダム音符をセット
  useEffect(() => {
    setSelectedKey(null);
    setMessage('');
    const notes = clef === 'treble' ? trebleNotes : bassNotes;
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setCurrentNote(randomNote);
  }, [clef]);

  // 次の問題を出す関数
  const nextNote = () => {
    setSelectedKey(null);
    setMessage('');
    const notes = clef === 'treble' ? trebleNotes : bassNotes;
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setCurrentNote(randomNote);
  };

  // 鍵盤ボタン押下時の判定
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

      <button onClick={() => setClef('treble')}>ト音記号</button>
      <button onClick={() => setClef('bass')}>ヘ音記号</button>

      <p>現在の記号: {clef}</p>

      <div style={{ fontSize: '48px', margin: '20px' }}>
        {/* ここに音符画像やフォントで表示予定 */}
        {currentNote ? `🎵 ${currentNote.label}` : '読み込み中...'}
      </div>

      <div>
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
