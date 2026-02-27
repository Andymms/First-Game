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
    color: '#972f2f'
};

const sword = {
    angle: 0,
    length: 40,
    damage: 20,
    attacking: false,
    attackTimer: 0,
    attackDuration: 10
};

window.addEventListener('keydown', (e) => {
    game.keys[e.key] = true;

    if (e.key === " " && !sword.attacking) {
        sword.attacking = true;
        sword.attackTimer = sword.attackDuration;
    }

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

function updateSword () {
    if (game.keys["w"] || game.keys["ArrowUp"]) sword.angle = -Math.PI / 2;
    if (game.keys["s"] || game.keys["ArrowDown"]) sword.angle = Math.PI / 2;
    if (game.keys["a"] || game.keys["ArrowLeft"]) sword.angle = Math.PI;
    if (game.keys["d"] || game.keys["ArrowRight"]) sword.angle = 0;

    if (sword.attacking) {
        sword.attackTimer--;
        if (sword.attackTimer <= 0) {
            sword.attacking = false;
        }
    }

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
    // Calculate sword position
    let swordLength = sword.length;
    if (sword.attacking) {
        swordLength = sword.length * 1.5; // Extend on attack
    }

    const swordX = player.x + Math.cos(sword.angle) * swordLength;
    const swordY = player.y + Math.sin(sword.angle) * swordLength;

    // Draw sword
    ctx.strokeStyle = sword.attacking ? '#ff0' : '#fff'; // Yellow when attacking
    ctx.lineWidth = sword.attacking ? 6 : 4;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(swordX, swordY);
    ctx.stroke();

    // Draw tip
    ctx.beginPath();
    ctx.arc(swordX, swordY, sword.attacking ? 8 : 6, 0, Math.PI * 2);
    ctx.fillStyle = sword.attacking ? '#ff0' : '#fff';
    ctx.fill();
}

function gameLoop() {
    updatePlayer();
    updateSword();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();