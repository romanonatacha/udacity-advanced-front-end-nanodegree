(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID 1c8cb51cb9fca0efa3e5b287b39086ee75c7ae78d7b078e5315bce96a31939a3'
            }
        })
        .then(response => response.json())
        .then(addImage)
        .catch(err => requesrError(err, 'image'));

        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=0ecc72c229c440bba4bf72fa9ef209af`)
        .then(response => response.json())
        .then(addArticles)
        .catch(err => requesrError(err, 'articles')); 
    });

    function addImage(data){
        let htmlContent = '';
        const firstImage = data.results[0];

        if (firstImage) {
            htmlContent = `<figure> \
            <img src="${firstImage.urls.regular}" alt="${searchedForText}"> \
            <figcaption>${searchedForText} by ${firstImage.user.name} </figcaption> \
            </figure>`;
        } else {
            htmlContent = '<div class=""error-no-image>No images available</div>';
        }


        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    function addArticles (data) {
        let htmlContent = '';

        if (data.response && data.response.docs && data.response.docs.length > 1) {
            const articles = data.response.docs;
            htmlContent = '<ul>' + articles.map(article => `<li class="article"> \
            <h2><a hred="${article.web_url}">${article.headline.main}</a></h2></li>) \
            <p>${article.snippet}</p></li>`).join('') + '</ul>';
        } else {
            htmlContent = '<div class="error-no-articles">No articles available</div>';
        }
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);

    }

    function requesrError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentElement('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }
})();
