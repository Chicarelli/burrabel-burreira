import { useState, useEffect } from 'react'
import './App.css'
import abelImage from './assets/images/burrabel-burreira.jfif'
import leilaImage from './assets/images/leila-burreira.png'
import { initAudio, playRandomPunch } from './utils/soundEffects'

function App() {
  const [abelHits, setAbelHits] = useState(0)
  const [leilaHits, setLeilaHits] = useState(0)
  const [abelAnimating, setAbelAnimating] = useState(false)
  const [leilaAnimating, setLeilaAnimating] = useState(false)
  const [audioInitialized, setAudioInitialized] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Initialize audio on first user interaction
  const handleFirstInteraction = () => {
    if (!audioInitialized) {
      initAudio();
      setAudioInitialized(true);
    }
  };

  const handleAbelClick = () => {
    handleFirstInteraction();
    
    // Play punch sound with intensity based on hit count
    if (soundEnabled) {
      const intensity = Math.min(1 + (abelHits * 0.05), 1.8);
      playRandomPunch(intensity);
    }
    
    setAbelHits(prev => prev + 1)
    setAbelAnimating(true)
    setTimeout(() => setAbelAnimating(false), 350)
  }

  const handleLeilaClick = () => {
    handleFirstInteraction();
    
    // Play punch sound with intensity based on hit count
    if (soundEnabled) {
      const intensity = Math.min(1 + (leilaHits * 0.05), 1.8);
      playRandomPunch(intensity);
    }
    
    setLeilaHits(prev => prev + 1)
    setLeilaAnimating(true)
    setTimeout(() => setLeilaAnimating(false), 350)
  }

  return (
    <div className="game-container">
      <div className="header">
        <div className="title-container">
          <h1>Julgamento dos verdadeiros culpados</h1>
          <button 
            className="sound-toggle"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Desligar som' : 'Ligar som'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
        <div className="counters-container">
          <div className="counter">
            <span className="counter-text">Você já socou Abel por {abelHits} vezes</span>
          </div>
          <div className="counter">
            <span className="counter-text">Você já socou Leila por {leilaHits} vezes</span>
          </div>
        </div>
      </div>
      
      <div className="game-area">
        <div 
          className={`target-container abel-container ${abelAnimating ? 'hit-animation' : ''}`}
          onClick={handleAbelClick}
        >
          <div className="image-wrapper">
            <img src={abelImage} alt="Abel Ferreira" className="target-image" />
            <div 
              className="bleed-overlay" 
              style={{
                opacity: Math.min(abelHits * 0.08, 0.85),
                background: `
                  radial-gradient(circle at 50% 40%, 
                    rgba(139, 0, 0, ${Math.min(abelHits * 0.12, 0.9)}) 0%, 
                    rgba(200, 0, 0, ${Math.min(abelHits * 0.1, 0.7)}) 15%, 
                    rgba(255, 50, 50, ${Math.min(abelHits * 0.08, 0.5)}) 35%, 
                    transparent 70%),
                  radial-gradient(circle at 30% 60%, 
                    rgba(120, 0, 0, ${Math.min(abelHits * 0.09, 0.8)}) 0%, 
                    rgba(180, 20, 20, ${Math.min(abelHits * 0.07, 0.6)}) 25%, 
                    transparent 60%),
                  radial-gradient(circle at 70% 30%, 
                    rgba(160, 10, 10, ${Math.min(abelHits * 0.11, 0.9)}) 0%, 
                    rgba(220, 40, 40, ${Math.min(abelHits * 0.06, 0.4)}) 20%, 
                    transparent 50%),
                  linear-gradient(180deg,
                    transparent 60%,
                    rgba(139, 0, 0, ${Math.min(abelHits * 0.05, 0.3)}) 80%,
                    rgba(200, 0, 0, ${Math.min(abelHits * 0.08, 0.5)}) 100%)
                `
              }}
            ></div>
          </div>
          <div className="target-label">Abel</div>
        </div>
        
        <div 
          className={`target-container leila-container ${leilaAnimating ? 'hit-animation' : ''}`}
          onClick={handleLeilaClick}
        >
          <div className="image-wrapper">
            <img src={leilaImage} alt="Leila Pereira" className="target-image" />
            <div 
              className="bleed-overlay" 
              style={{
                opacity: Math.min(leilaHits * 0.08, 0.85),
                background: `
                  radial-gradient(circle at 50% 40%, 
                    rgba(139, 0, 0, ${Math.min(leilaHits * 0.12, 0.9)}) 0%, 
                    rgba(200, 0, 0, ${Math.min(leilaHits * 0.1, 0.7)}) 15%, 
                    rgba(255, 50, 50, ${Math.min(leilaHits * 0.08, 0.5)}) 35%, 
                    transparent 70%),
                  radial-gradient(circle at 35% 65%, 
                    rgba(120, 0, 0, ${Math.min(leilaHits * 0.09, 0.8)}) 0%, 
                    rgba(180, 20, 20, ${Math.min(leilaHits * 0.07, 0.6)}) 25%, 
                    transparent 60%),
                  radial-gradient(circle at 75% 25%, 
                    rgba(160, 10, 10, ${Math.min(leilaHits * 0.11, 0.9)}) 0%, 
                    rgba(220, 40, 40, ${Math.min(leilaHits * 0.06, 0.4)}) 20%, 
                    transparent 50%),
                  linear-gradient(180deg,
                    transparent 60%,
                    rgba(139, 0, 0, ${Math.min(leilaHits * 0.05, 0.3)}) 80%,
                    rgba(200, 0, 0, ${Math.min(leilaHits * 0.08, 0.5)}) 100%)
                `
              }}
            ></div>
          </div>
          <div className="target-label">Leila</div>
        </div>
      </div>
      
      <div className="instructions">
        <p>Só isso? Você pode fazer melhor! 🥊</p>
      </div>
    </div>
  )
}

export default App
