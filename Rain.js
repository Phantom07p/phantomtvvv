function createRain() {
  const rain = document.getElementById('rain');
  for (let i = 0; i < 150; i++) {
    const drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = 0.5 + Math.random() * 1.5 + 's';
    drop.style.animationDelay = Math.random() * 5 + 's';
    rain.appendChild(drop);
  }
}
createRain();