const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.getElementById('score');
const telaGameOver = document.getElementById('tela-game-over');
const btnReiniciar = document.getElementById('btn-reiniciar');

let isGameOver = false;
let score = 0;
let scoreInterval;

const startScore = () => {
    scoreInterval = setInterval(() => {
        if (!isGameOver) {
            score++;
            scoreElement.textContent = score;
        }
    }, 200);
};

startScore();

const jump = () => {
    if (!isGameOver) {
        mario.classList.add('jump');
        setTimeout(() => mario.classList.remove('jump'), 1000);
    }
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 120) {
        isGameOver = true;
        
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = './images/game-over.png';
        
        clearInterval(loop);
        clearInterval(scoreInterval);
        
        telaGameOver.style.display = 'flex';
    }

}, 10);

document.addEventListener('keydown', (e) => {
    if (isGameOver && e.code === 'Space') window.location.reload();
    else jump();
});

btnReiniciar.addEventListener('click', () => window.location.reload());
