let randomWordUri = 'https://random-word-api.herokuapp.com//word?number=1';
let giphyUri1 = 'https://api.giphy.com/v1/gifs/search?api_key=pLE32e3cQD1NNhjGkzzRhqk84ilnL2yc&q=';
let giphyUri2 = '&limit=5&offset=0&rating=g&lang=en';


async function renderRandomImage() {
    try {
        let wordData = await fetch(randomWordUri)
        let word = await wordData.json();
        let giphyData = await fetch(giphyUri1 + word[0] + giphyUri2);
        let imageObj = await giphyData.json();
        if (imageObj.data.length === 0) {
            renderRandomImage();
            return;
        }
        let image = document.createElement('img');
        image.src = imageObj.data[0].images.downsized_large.url;
        image.alt = "Giphy Image";
        document.body.append(image);
    } catch (error) {
        console.log(error);
    }
}

renderRandomImage();