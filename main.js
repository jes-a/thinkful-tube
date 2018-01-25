const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
	const query = {
		'q': `${searchTerm}`, 
		'type': '',
		'part': 'snippet', 
		'key': 'AIzaSyAgRpUKp-ldnYPEuORywRdnFQN9o2HmirM'
	}
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
};

function renderResult(result) {
	return `
		<div>
			<a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
				<img src="${result.snippet.thumbnails.default.url}" alt="video thumbnail for ${result.snippet.title}" class="thumbnail">
				<h3 class="js-result-name">${result.snippet.title}</h3>
			</a>
			<p class="js-description">${result.snippet.description}</p>
		</div>
	`;
}

function displayYoutubeSearchData(data) {
	const results = data.items.map((item, index) => 
		renderResult(item));
	$('.js-search-results').html("<h2>Search Results</h2>" + results);
};

function handleSubmit() {
	$('.js-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		const query = queryTarget.val();
		queryTarget.val('');
		if (query == '') {
			$('.js-search-results').html("<h2>Please enter a search term</h2>")
		} else {
		getDataFromApi(query, displayYoutubeSearchData);
		}
	});
}


$(handleSubmit);