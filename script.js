const audioPlayer = document.getElementById('audio-player');
let musics = [];

async function loadMusicsFromAPI() {
    const apiUrl = 'https://api.jamendo.com/v3.0/tracks/?client_id=fbfebb38&format=json&limit=10';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        musics = data.results.map(track => ({
            title: track.name,
            artist: track.artist_name,
            src: track.audio,
            cover: track.album_image
        }));
        renderMusics();
    } catch (error) {
        console.error('Error fetching musics:', error);
    }
}

function renderMusics() {
    const container = document.getElementById('container-music');
    container.innerHTML = '';

    musics.forEach((music, index) => {
        const cardHTML = `
            <div class="card-music" onclick="playMusic(${index})">
            <div class="picture-music">
                    <img src="${music.cover}" alt="Capa do álbum ${music.title}">
                </div>
                <h3>${music.title}</h3>
                <p>${music.artist}</p>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

function playMusic(index) {
    const selectedMusic = musics[index];
    audioPlayer.src = selectedMusic.src;
    audioPlayer.play();
}
document.addEventListener('DOMContentLoaded', loadMusicsFromAPI);