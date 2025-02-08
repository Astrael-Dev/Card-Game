var audio;
var isPlaying = false;

document.addEventListener('DOMContentLoaded', function() {
    audio = new Audio('assets/sons/background-music.mp3');
    audio.loop = true;

    audio.addEventListener('canplaythrough', function() {
        console.log('Audio can play through.');
    });

    audio.addEventListener('error', function(e) {
        console.error('Error loading audio:', e);
    });

    console.log('Audio element created:', audio);
});

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        console.log('Audio is paused.');
    } else {
        audio.play().then(function() {
            isPlaying = true;
            console.log('Audio is playing.');
        }).catch(function(error) {
            console.error('Error playing audio:', error);
        });
    }
}