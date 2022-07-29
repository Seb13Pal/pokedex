function play() {
    let audio = new Audio(
        '/audio/clic.wav');
    audio.play();
}




function aleatoire(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

