const starsContainer = document.querySelector('.stars');
const numStars = 100; // Adjust number of stars

for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.animationDelay = `${Math.random() * 2}s`; // Randomize animation delay
    starsContainer.appendChild(star);
}