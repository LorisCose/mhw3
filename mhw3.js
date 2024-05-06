function cambia_news(event) {
    const new_strong=document.createElement('strong')
    new_strong.textContent='Ora inizierai a ricevere aggiornamenti e offerte dal Google Store.';
    const new_p=document.createElement('p');
    new_p.textContent='Registrazione effettuata';

    const container1=document.querySelector('.scritta_newsletter');
    container1.innerHTML='';
    container1.appendChild(new_strong);

    const container2=document.querySelector('.registrati_newsletter');
    container2.innerHTML='';
    container2.appendChild(new_p);

}

function attivaRicerca(event){
    const icona = event.currentTarget;

    const container = document.querySelector('#contenitore_barra_ricerca_nav');
    container.classList.remove('hidden');
    event.preventDefault();
}

function chiudiRicerca(event){
    const button = event.currentTarget;

    const container = document.querySelector('#contenitore_barra_ricerca_nav');
    container.classList.add('hidden');
}

function slideDestra(event){
    const button = event.currentTarget;

    const container1 = document.querySelector('#nascondi_cp1');
    container1.classList.add('hidden');

    const container2 = document.querySelector('#nascondi_cp2');
    container2.classList.remove('hidden');
}

function slideSinistra(event){
    const button = event.currentTarget;

    const container1 = document.querySelector('#nascondi_cp1');
    container1.classList.remove('hidden');

    const container2 = document.querySelector('#nascondi_cp2');
    container2.classList.add('hidden');
}

function hoverImg_1(event){
    const new_img = event.currentTarget;
    new_img.src='media/colori_watch.jpeg';
}

function leaveImg_1(event){
    const new_img= event.currentTarget;
    new_img.src='media/pop_1.png';
}

function hoverImg_2(event){
    const new_img = event.currentTarget;
    new_img.src='media/colori_buds.jpg';
}

function leaveImg_2(event){
    const new_img= event.currentTarget;
    new_img.src='media/pop_2.png';
}

function hoverImg_3(event){
    const new_img = event.currentTarget;
    new_img.src='media/tipi_videocamere.jpeg';
}

function leaveImg_3(event){
    const new_img= event.currentTarget;
    new_img.src='media/pop_3.png';
}

function search(event){
    
    event.preventDefault();
    const bottone=document.querySelector('#contenitore_b_notizie');
    bottone.classList.add('hidden');

    console.log('Eseguo ricerca');
    
    rest_url = 'https://content.guardianapis.com/search?section=technology&page-size=6&q=google&api-key=59ad084f-b783-4857-980c-97fa3fb5f048&format=json';
    console.log('URL: ' + rest_url);
    
    fetch(rest_url).then(onResponse).then(onJson);
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function onJson(json) {
    console.log('JSON ricevuto');
   
    const contenitore = document.querySelector('#contenitore_notizie');
    contenitore.innerHTML = '';
    
    
    for(let i=0; i<6; i++)
    {
      
      const articolo = json.response.results[i]
     
      const title = articolo.webTitle;
      const urls = articolo.webUrl;
      
      
      const notizia = document.createElement('div');
      notizia.classList.add('notizia');
      
      
      const titolo_notizia = document.createElement('a');
      titolo_notizia.href = urls
      titolo_notizia.textContent = title;
      
      notizia.appendChild(titolo_notizia);
      // Aggiungiamo il div alla libreria
      contenitore.appendChild(notizia);
    }
  }
  

//main

const button_news = document.querySelector('#b_news');
button_news.addEventListener('click',cambia_news);

const icona_cerca = document.querySelector('#cerca');
icona_cerca.addEventListener('click',attivaRicerca);

const b_annulla = document.querySelector('#annulla');
b_annulla.addEventListener('click',chiudiRicerca);

const b_destra = document.querySelector('#destra');
b_destra.addEventListener('click',slideDestra);

const b_sinistra = document.querySelector('#sinistra');
b_sinistra.addEventListener('click',slideSinistra);

const cambio_img_1 = document.querySelector('#cambio_img_1');
cambio_img_1.addEventListener('mouseenter',hoverImg_1);

const ritorno_img_1=document.querySelector('#cambio_img_1');
ritorno_img_1.addEventListener ('mouseleave', leaveImg_1);

const cambio_img_2 = document.querySelector('#cambio_img_2');
cambio_img_2.addEventListener('mouseenter',hoverImg_2);

const ritorno_img_2=document.querySelector('#cambio_img_2');
ritorno_img_2.addEventListener ('mouseleave', leaveImg_2);

const cambio_img_3 = document.querySelector('#cambio_img_3');
cambio_img_3.addEventListener('mouseenter',hoverImg_3);

const ritorno_img_3=document.querySelector('#cambio_img_3');
ritorno_img_3.addEventListener ('mouseleave', leaveImg_3);

const b_notizie = document.querySelector('#b_notizie');
b_notizie.addEventListener('click', search)



//api ebay

function onJson_ebay(json) {
    console.log('JSON ricevuto');
    console.log(json);
    // Svuotiamo la libreria
    const library = document.querySelector('#prodotti-view');
    library.innerHTML = '';
    // Leggi il numero di risultati
    const results = json.itemSummaries;
    let num_results = results.length;
    // Mostriamone al massimo 10
    if(num_results > 10)
      num_results = 10;
    // Processa ciascun risultato
    for(let i=0; i<num_results; i++)
    {
      // Leggi il documento
      const prodotti_data = results[i]
      // Leggiamo info
      const nome_prodotto = prodotti_data.title;
      const selected_image = prodotti_data.image[0].imageUrl;
      // Creiamo il div che conterrà immagine e didascalia
      const prodotto = document.createElement('div');
      prodotto.classList.add('prodotto_api');
      // Creiamo l'immagine
      const img = document.createElement('img');
      img.src = selected_image;
      // Creiamo la didascalia
      const caption = document.createElement('span');
      caption.textContent = nome_prodotto;
      // Aggiungiamo immagine e didascalia al div
      prodotto.appendChild(img);
      prodotto.appendChild(caption);
      // Aggiungiamo il div alla libreria
      library.appendChild(prodotto);
    }
  }
  

  function onResponse_ebay(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  

  function search_ebay(event)
  {
    // Impedisci il submit del form
    event.preventDefault();
    // Leggi valore del campo di testo
    const prodotto_input = document.querySelector('#ricerca_prodotto');
    const prodotto_value = encodeURIComponent(prodotto_input.value);
    console.log('Eseguo ricerca: ' + prodotto_value);
    // Esegui la richiesta
    fetch("https://api.ebay.com/buy/browse/v1/item_summary/search?q=" + prodotto_value,
      {
        headers:
        {
          'Authorization': 'Bearer ' + token,
          'X-EBAY-C-MARKETPLACE-ID': 'EBAY_IT'
        }
      }
    ).then(onResponse_ebay).then(onJson_ebay);
  }
  

  function onTokenJson(json)
  {
    console.log(json)
    // Imposta il token global
    token = json.access_token;
  }
  

  function onTokenResponse(response)
  {
    return response.json();
  }
  

  // OAuth credentials --- NON SICURO!
  const client_id = 'LorenzoC-sitowebp-PRD-ac42364b7-e7e31472';
  const client_secret = 'PRD-c42364b700f4-1a6c-449a-a5f2-9482';
  // Dichiara variabile token
  let token;
  // All'apertura della pagina, richiediamo il token
  fetch("https://api.ebay.com/identity/v1/oauth2/token",
      {
     method: "post",
     mode: 'no-cors',
     body: 'grant_type=client_credentials',
     scope:'https://api.ebay.com/oauth/api_scope',
     headers:
     {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
     }
    }
  ).then(onTokenResponse).then(onTokenJson);
  
  
  // Aggiungi event listener al form
  const form = document.querySelector('form');
  form.addEventListener('submit', search_ebay)
