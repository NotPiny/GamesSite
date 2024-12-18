const canvas = document.getElementById("poolTable");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

const BALL_RADIUS = 10;
const balls = [];
const friction = 0.99;
let mouseX = 0;
let mouseY = 0;
let shooting = false;

class Ball {
    constructor(x, y, vx = 0, vy = 0, color = "white", label = null) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.label = label;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        if (this.label) {
            ctx.fillStyle = "black";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.label, this.x, this.y);
        }
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Friction
        this.vx *= friction;
        this.vy *= friction;

        // Stop ball when speed is very low
        if (Math.abs(this.vx) < 0.01) this.vx = 0;
        if (Math.abs(this.vy) < 0.01) this.vy = 0;

        // Wall collision
        if (this.x - BALL_RADIUS < 0 || this.x + BALL_RADIUS > canvas.width) {
            this.vx = -this.vx;
            this.x = this.x - BALL_RADIUS < 0 ? BALL_RADIUS : canvas.width - BALL_RADIUS;
        }
        if (this.y - BALL_RADIUS < 0 || this.y + BALL_RADIUS > canvas.height) {
            this.vy = -this.vy;
            this.y = this.y - BALL_RADIUS < 0 ? BALL_RADIUS : canvas.height - BALL_RADIUS;
        }
    }
}

// Initialize balls
function setupBalls() {
    // Place balls in a traditional 8-ball rack
    const initialBalls = [
        {
            x: 400,
            y: 200,
            color: "white",
            label: null
        },

        // 8-ball rack
        { x: 400 + BALL_RADIUS * 2, y: 200, color: "black", label: "8" },
        { x: 400 - BALL_RADIUS * 2, y: 200 - BALL_RADIUS, color: "yellow", label: "1" },
        { x: 400 - BALL_RADIUS * 2, y: 200 + BALL_RADIUS, color: "blue", label: "2" },
        { x: 400 - BALL_RADIUS * 4, y: 200 - BALL_RADIUS * 2, color: "red", label: "3" },
        { x: 400 - BALL_RADIUS * 4, y: 200, color: "purple", label: "4" },
        { x: 400 - BALL_RADIUS * 4, y: 200 + BALL_RADIUS * 2, color: "orange", label: "5" },
        { x: 400 - BALL_RADIUS * 6, y: 200 - BALL_RADIUS * 3, color: "green", label: "6" },
        { x: 400 - BALL_RADIUS * 6, y: 200 - BALL_RADIUS, color: "brown", label: "7" },
        { x: 400 - BALL_RADIUS * 6, y: 200 + BALL_RADIUS, color: "yellow", label: "9" },
        { x: 400 - BALL_RADIUS * 6, y: 200 + BALL_RADIUS * 3, color: "blue", label: "10" },
        { x: 400 - BALL_RADIUS * 8, y: 200 - BALL_RADIUS * 4, color: "red", label: "11" },
        { x: 400 - BALL_RADIUS * 8, y: 200 - BALL_RADIUS * 2, color: "purple", label: "12" },
        { x: 400 - BALL_RADIUS * 8, y: 200, color: "orange", label: "13" },
        { x: 400 - BALL_RADIUS * 8, y: 200 + BALL_RADIUS * 2, color: "green", label: "14" },
        { x: 400 - BALL_RADIUS * 8, y: 200 + BALL_RADIUS * 4, color: "brown", label: "15" }
    ];

    initalBalls.forEach(ball => {
        balls.push(new Ball(ball.x, ball.y, 0, 0, ball.color));
    })
}

// Detect collisions and apply physics
function detectCollisions() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const b1 = balls[i];
            const b2 = balls[j];
            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < BALL_RADIUS * 2) {
                // Simple elastic collision
                const angle = Math.atan2(dy, dx);
                const speed1 = Math.sqrt(b1.vx ** 2 + b1.vy ** 2);
                const speed2 = Math.sqrt(b2.vx ** 2 + b2.vy ** 2);

                const direction1 = Math.atan2(b1.vy, b1.vx);
                const direction2 = Math.atan2(b2.vy, b2.vx);

                b1.vx = speed2 * Math.cos(direction2 - angle);
                b1.vy = speed2 * Math.sin(direction2 - angle);
                b2.vx = speed1 * Math.cos(direction1 - angle);
                b2.vy = speed1 * Math.sin(direction1 - angle);

                // Separate overlapping balls
                const overlap = BALL_RADIUS * 2 - distance;
                b1.x -= overlap * Math.cos(angle) / 2;
                b1.y -= overlap * Math.sin(angle) / 2;
                b2.x += overlap * Math.cos(angle) / 2;
                b2.y += overlap * Math.sin(angle) / 2;
            }
        }
    }
}

// Draw the cue stick
function drawCue() {
    const cueBall = balls[0];
    if (shooting) {
        ctx.beginPath();
        ctx.moveTo(cueBall.x, cueBall.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.update();
        ball.draw();
    });

    drawCue();
    detectCollisions();
    requestAnimationFrame(animate);
}

// Mouse controls
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

canvas.addEventListener("mousedown", () => {
    shooting = true;
});

canvas.addEventListener("mouseup", () => {
    shooting = false;

    const cueBall = balls[0];
    const dx = cueBall.x - mouseX;
    const dy = cueBall.y - mouseY;

    cueBall.vx = dx * .05;
    cueBall.vy = dy * .05;
});

// Start game
setupBalls();
animate();
