import { useState, useEffect } from 'react';
import './App.css'; // CSSを使って位置を調整するため

const notes = [
  { name: 'C4', label: 'ド', position: 93, needsLedgerLine: true, frequency: 261.63 },  // C4
  { name: 'D4', label: 'レ', position: 88, frequency: 293.66 },  // D4
  { name: 'E4', label: 'ミ', position: 83, frequency: 329.63 },  // E4
  { name: 'F4', label: 'ファ', position: 78, frequency: 349.23 }, // F4
  { name: 'G4', label: 'ソ', position: 73, frequency: 392.00 },  // G4
  { name: 'A4', label: 'ラ', position: 68, frequency: 440.00 },  // A4
  { name: 'B4', label: 'シ', position: 63, stemDown: true, frequency: 493.88 },  // B4
  { name: 'C5', label: 'ド', position: 58, stemDown: true, frequency: 523.25 },  // C5
];

export default function App() {
  const [currentNote, setCurrentNote] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [message, setMessage] = useState('');
  const [audioContext] = useState(new (window.AudioContext || window.webkitAudioContext)());

  useEffect(() => {
    nextNote();
  }, []);

  const playNote = (frequency) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  };

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
      playNote(currentNote.frequency);
      setTimeout(() => {
        nextNote();
      }, 1000);
    } else {
      setMessage('不正解です。もう一度チャレンジしてください。');
    }
  };

  return (
    <div className="app-container">
      <p className={`message ${message ? (message.includes('正解') ? 'correct' : 'incorrect') : ''}`}>
        {message}
      </p>
      
      <h1 className="title">🎶 おんぷドリル 🎵</h1>

      <div className="staff-container">
        <img src="g-clef.png" alt="ト音記号" className="g-clef-image" />
        {currentNote && (
          <div 
            className="note-container"
            style={{ top: `${currentNote.position}%` }}
          >
            {currentNote.needsLedgerLine && <div className="ledger-line"></div>}
            <div className="note-head"></div>
            <div className={`note-stem ${currentNote.stemDown ? 'stem-down' : ''}`}></div>
          </div>
        )}
      </div>

      <div className="buttons-container">
        {['ド', 'レ', 'ミ', 'ファ', 'ソ', 'ラ', 'シ', 'ド'].map((keyName, i) => (
          <button 
            key={i} 
            onClick={() => handleKeyPress(keyName)} 
            className={`note-button ${selectedKey === keyName ? 'selected' : ''}`}
          >
            {keyName}
          </button>
        ))}
      </div>
    </div>
  );
}
