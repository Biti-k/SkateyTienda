const gif = document.querySelector('.gif')
const skateIcon = document.querySelector('.icon')
const audio = new Audio('audios/skateSound.wav')
skateIcon.addEventListener("click", () => {
    console.log('hi')
    gif.classList.remove('hidden')
    gif.classList.add('animation')
    audio.play()
    setTimeout(() => {
        gif.classList.add('hidden')
    }, 3000)
    console.log('hi2')
})