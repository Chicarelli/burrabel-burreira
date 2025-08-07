// Sound Effects for Boxing Game
let audioContext = null;

// Initialize audio context (needs user interaction first)
export const initAudio = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

// Generate punch sound effect
export const playPunchSound = (intensity = 1) => {
  if (!audioContext) {
    initAudio();
  }

  // Resume audio context if suspended (browser autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const duration = 0.15;
  const currentTime = audioContext.currentTime;

  // Create oscillator for the main punch sound (low frequency thump)
  const oscillator1 = audioContext.createOscillator();
  const gainNode1 = audioContext.createGain();
  
  // Create second oscillator for impact crack (higher frequency)
  const oscillator2 = audioContext.createOscillator();
  const gainNode2 = audioContext.createGain();
  
  // Create noise for realistic impact
  const bufferSize = 4096;
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  
  // Generate white noise
  for (let i = 0; i < bufferSize; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }
  
  const noiseSource = audioContext.createBufferSource();
  const noiseGain = audioContext.createGain();
  noiseSource.buffer = noiseBuffer;

  // Configure main punch thump (low frequency)
  oscillator1.type = 'sine';
  oscillator1.frequency.setValueAtTime(60 + (intensity * 20), currentTime);
  oscillator1.frequency.exponentialRampToValueAtTime(30, currentTime + duration);
  
  gainNode1.gain.setValueAtTime(0.6 * intensity, currentTime);
  gainNode1.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);

  // Configure impact crack (higher frequency)
  oscillator2.type = 'square';
  oscillator2.frequency.setValueAtTime(200 + (intensity * 100), currentTime);
  oscillator2.frequency.exponentialRampToValueAtTime(80, currentTime + duration * 0.3);
  
  gainNode2.gain.setValueAtTime(0.3 * intensity, currentTime);
  gainNode2.gain.exponentialRampToValueAtTime(0.01, currentTime + duration * 0.3);

  // Configure noise burst
  noiseGain.gain.setValueAtTime(0.4 * intensity, currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.05);

  // Connect audio nodes
  oscillator1.connect(gainNode1);
  gainNode1.connect(audioContext.destination);
  
  oscillator2.connect(gainNode2);
  gainNode2.connect(audioContext.destination);
  
  noiseSource.connect(noiseGain);
  noiseGain.connect(audioContext.destination);

  // Start and stop sounds
  oscillator1.start(currentTime);
  oscillator1.stop(currentTime + duration);
  
  oscillator2.start(currentTime);
  oscillator2.stop(currentTime + duration * 0.3);
  
  noiseSource.start(currentTime);
  noiseSource.stop(currentTime + 0.05);
};

// Generate different punch variations
export const playPunchVariation = (variation = 'normal') => {
  const variations = {
    light: () => playPunchSound(0.6),
    normal: () => playPunchSound(1.0),
    heavy: () => playPunchSound(1.4),
    critical: () => playPunchSound(1.8)
  };

  const soundFunc = variations[variation] || variations.normal;
  soundFunc();
};

// Play punch sound with random variation for realism
export const playRandomPunch = (baseIntensity = 1.0) => {
  const randomVariation = 0.8 + Math.random() * 0.4; // 0.8 to 1.2 multiplier
  const intensity = baseIntensity * randomVariation;
  playPunchSound(intensity);
};