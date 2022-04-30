function onJsonCantante(json) {
    console.log('JSON ricevuto');
    console.log(json);
    const ris = document.querySelector('div#view');
    ris.innerHTML = '';
    
    for(let i=0; i<10; i++)
    {
      const risultato = json.tracks.items[i];
      const title = risultato.name;
      const image = risultato.album.images[1].url;

      const album = document.createElement('div');
      album.classList.add('album');
      const caption = document.createElement('p');
      caption.textContent = title;
      const img = document.createElement('img');
      img.src = image;
      
      album.appendChild(caption); 
      album.appendChild(img);
      ris.appendChild(album);
    }
  }

  function onJsonBrano(json) {
    console.log('JSON ricevuto');
    console.log(json);
    const ris = document.querySelector('div#view');
    ris.innerHTML = '';
    
    for(let i=0; i<10; i++)
    {
      const risultato = json.tracks.items[i];
      const artista = risultato.album.artists[0].name;
      const nome_album = risultato.album.name;
      const image = risultato.album.images[1].url;

      const album = document.createElement('div');
      album.classList.add('album');
      const name_artist = document.createElement('p');
      name_artist.textContent = artista;
      const name_album = document.createElement('p');
      name_album.textContent = nome_album;
      const img = document.createElement('img');
      img.src = image;
      musica = risultato.preview_url;

      album.appendChild(name_artist);
      album.appendChild(name_album);
      album.appendChild(img);
      album.addEventListener("click", play);
      ris.appendChild(album);
    }
  }
  
function play(event){
    const div = event.target.parentNode;
    div.classList.add("hidden");
    if(!musica){
        alert("Preview del brano non presente.");
    }
    const prova = document.querySelector("#playmusica");
    prova.classList.remove("hidden");
    prova.src = musica;
}

  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
  function ricerca(event){
    event.preventDefault();
    const input_contenuto = document.querySelector('#content').value;
    if(!input_contenuto){
        alert("La barra di ricerca è vuota, inserisci qualcosa...");
    }else{
    const valore_contenuto = encodeURIComponent(input_contenuto);
    const scelta = document.querySelector("#cont").value;

    if(scelta == "cantante"){
        fetch("https://api.spotify.com/v1/search?q=" + valore_contenuto + "&type=track&market=IT",
      {headers:{'Authorization': 'Bearer ' + token}}).then(onResponse).then(onJsonCantante);
    }

    if(scelta == "brano"){
        fetch("https://api.spotify.com/v1/search?q=" + valore_contenuto + "&type=track&market=IT&limit=1",
      {headers:{'Authorization': 'Bearer ' + token}}).then(onResponse).then(onJsonBrano);
    }
  }
}
  
  function onTokenJson(json)
  {
    token = json.access_token;
  }
  
  function onTokenResponse(response)
  {
    return response.json();
  }
  
  const client_id = 'b327632428cd42afb215695af6cd77f9';
  const client_secret = '38e594acb7044a4f916d66a2ef9d4f8e';
  let token;
  let musica;
  fetch("https://accounts.spotify.com/api/token",
      {
     method: "post",
     body: 'grant_type=client_credentials',
     headers:
     {
         'Accept' : 'application/json',
         'Content-Type' : 'application/x-www-form-urlencoded',
         'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
     }
    }
  ).then(onTokenResponse).then(onTokenJson);
  const form = document.querySelector('form');
  form.addEventListener('submit', ricerca)

  