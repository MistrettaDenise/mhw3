function chiudi_images_box_spotify(event){
  event.currentTarget.textContent= "CLICCA QUA PER QUALCHE CONSIGLIO MUSICALE MENTRE CUCINI";
  const div_images_spotify= event.currentTarget.parentNode.querySelector('.show_images');
  div_images_spotify.innerHTML="";
  div_images_spotify.classList.remove('show_images');
  div_images_spotify.classList.remove('box_spotify');
  div_images_spotify.classList.add('images_hidden');
  event.currentTarget.removeEventListener('click',chiudi_images_box_spotify);
  event.currentTarget.addEventListener('click',spotifyHandler);
}

function spotifyHandler(event){
event.currentTarget.textContent= "NASCONDI CONSIGLI MUSICALI";
const div_images_spotify= event.currentTarget.parentNode.querySelector('.images_hidden');
div_images_spotify.classList.remove('images_hidden');
div_images_spotify.classList.add('show_images');
event.currentTarget.removeEventListener('click',spotifyHandler);
event.currentTarget.addEventListener('click',chiudi_images_box_spotify);
fetch("https://api.spotify.com/v1/playlists/1IlGG0JTFJSTE59wEgbGjA/tracks",
{
  headers:
  {
    'Authorization': 'Bearer ' + token,
    'Content-Type' : 'application/json'
  }
}
).then(onResponse).then(onSpotifyJsonHandler);
}

function onSpotifyJsonHandler(json){
  const box= document.querySelector('#spotify_box');
  box.classList.add('box_spotify');
  for(let i=0;i<5;i++){
    const div = document.createElement('div');
    box.appendChild(div);

    const image = document.createElement('img');
    image.classList.add('thumbnail');
    image.src= json.items[i].track.album.images[2].url;
    div.appendChild(image);

    const text1= document.createElement('div');
    text1.classList.add('text_content')
    const text2= document.createElement('div');
    const text3= document.createElement('div');
    text2.textContent = json.items[i].track.name;
    text3.textContent = json.items[i].track.artists[0].name;
    text2.classList.add('spotify_text1');
    text3.classList.add('spotify_text2');
    div.appendChild(text1);
    text1.appendChild(text2);
    text1.appendChild(text3);
    
    const link = document.createElement('a');
    link.href = json.items[i].track.external_urls.spotify;
  
    const play_button = document.createElement('img');
    play_button.classList.add('play_button');
    play_button.src = "./images/play_button.png"
  
    link.appendChild(play_button);
    div.appendChild(link);

  }
}

function onTokenJson(json){
  token = json.access_token;
}

function onResponse(response){
  return response.json();
}

const client_secret= '38e594acb7044a4f916d66a2ef9d4f8e';
const client_id= 'b327632428cd42afb215695af6cd77f9'; 

let token;

fetch('https://accounts.spotify.com/api/token', 
{
  method: "post",
  body: 'grant_type=client_credentials',
  headers:
  {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
  }
}
).then(onResponse).then(onTokenJson);

const spotify_button = document.querySelector('#spotify_content');
spotify_button.addEventListener('click',spotifyHandler);