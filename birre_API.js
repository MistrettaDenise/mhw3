fetch("https://api.punkapi.com/v2/beers?per_page=12").then(onResponse).then(onJSON);

function onResponse(response) {
    return response.json();
}

function onJSON(json) {
    const beers = json;

    for(beer of beers) {
        creaBirra(beer.name, beer.abv, beer.tagline, beer.description, beer.image_url);
    }
}

function creaBirra(nome, abv, tagline, descrizione, immagine){
    const cont = document.createElement('div');
    cont.classList.add('container');
    const img = document.createElement('img');    
    if(immagine !== null){
        img.src = immagine;
        img.classList.add('img');
    }else{
        img.src = 'images/birra_default.png'
        img.classList.add('img');
    }
    const tit = document.createElement('div');
    tit.classList.add('title');
    const name = document.createElement('h1');
    name.textContent = nome;
    const alch = document.createElement('h3');
    alch.textContent = abv + '%';
    const tagl = document.createElement('h3');
    tagl.textContent = tagline;
    const descr = document.createElement('p');
    descr.textContent = descrizione;

    cont.appendChild(img);
    cont.appendChild(tit);
    tit.appendChild(name);
    tit.appendChild(alch);
    cont.appendChild(tagl);
    cont.appendChild(descr);

    const sezione = document.querySelector('#birre');
    sezione.appendChild(cont);
}