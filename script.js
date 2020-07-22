const gifSearch = document.getElementById('gif-search');
const apiKey = "HUIZBIIKoILvOPHKxzRFuISMvgr37nib";
const gifs = document.getElementById('search-results-gif');
const nextGifs = document.getElementById('load-more');

let search = "";




const gifResults = () => {
    fetch(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}`)
    .then(response => response.json())
    .then(data => {
        data.data.map(gif => gif.images.fixed_width.url)
        .forEach(url => {
            const newGif = document.createElement('img');
            newGif.setAttribute('src', url);
            newGif.classList.add('gif-results-padding');
            gifs.appendChild(newGif);
        })
        console.log(gifs.childElementCount);
        console.log(data);
    })
    .catch(err => console.error('Roaches have infiltrated: ' + err));
}

let nextGifList = 25;

const nextGifResults = () => {
    fetch(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&offset=${nextGifList}`)
    .then(response => response.json())
    .then(data => {
        data.data.map(gif => gif.images.fixed_width.url)
        .forEach(url => {
            const newGif = document.createElement('img');
            newGif.setAttribute('src', url);
            newGif.classList.add('gif-results-padding');
            gifs.appendChild(newGif);
        })
        nextGifList += 25;
        console.log(gifs.childElementCount);
        console.log(data);
        console.log(data.pagination.total_count);
    })
    .catch(err => console.error('Roaches have infiltrated: ' + err));
}

gifSearch.addEventListener('input', e => {
    if(gifs.childElementCount > 0) {
        gifs.innerHTML = "";
    }

    search = e.target.value;
    gifResults();
    console.log(search);
});

nextGifs.addEventListener('click', nextGifResults);