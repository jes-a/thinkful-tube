const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
	const query = {
		'q': `${searchTerm}`, 
		'type': '',
		'part': 'snippet', 
		'key': 'AIzaSyAgRpUKp-ldnYPEuORywRdnFQN9o2HmirM', 
		'maxResults': '10',
	}
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
};


function renderResult(result) {
	return `<div class="search-result">
			<a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
				<img src="${result.snippet.thumbnails.medium.url}" alt="video thumbnail for ${result.snippet.title}" class="thumbnail">
				<h3 class="js-result-name">${result.snippet.title}</h3>
			</a>
			<p class="js-description">${result.snippet.description}</p>
			<p class="view-more-channel"><a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">More from ${result.snippet.channelTitle} &gt;</a></p>
		</div>`;
}

function displayYoutubeSearchData(data) {
	const results = data.items.forEach((item, index) => {
		let result = renderResult(item);
		$('.js-search-results').append(result);
	});
	const pageResults = data.pageInfo.resultsPerPage;
	$('#js-number-results').html(`Results displayed: ${pageResults}`);
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
		$('.results-header').show();
		}
	});
}

$(handleSubmit);