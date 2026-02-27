const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Game state
const game = {
    width: 800,
    height: 600,
    keys: {}
};

const player = {
    x: 400,
    y: 300,
    radius: 15,
    speed: 4,
    color: '#4a90e2'
};

window.addEventListener('keydown', (e) => {
    game.keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    game.keys[e.key] = false;
});

function updatePlayer() {
    if (game.keys['w'] || game.keys['ArrowUp']) player.y -= player.speed;
    if (game.keys['s'] || game.keys['ArrowDown']) player.y += player.speed;
    if (game.keys['a'] || game.keys['ArrowLeft']) player.x -= player.speed;
    if (game.keys['d'] || game.keys['ArrowRight']) player.x += player.speed;
    
    // Keep player in bounds
    player.x = Math.max(player.radius, Math.min(game.width - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(game.height - player.radius, player.y));
}

// Draw everything
function draw() {
    // Clear screen
    ctx.fillStyle = '#16213e';
    ctx.fillRect(0, 0, game.width, game.height);
    
    // Draw player (blue circle for now)
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    
    // Draw "sword" (just a line for now)
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(player.x + 20, player.y);
    ctx.lineTo(player.x + 40, player.y);
    ctx.stroke();
}

function gameLoop() {
    updatePlayer();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();