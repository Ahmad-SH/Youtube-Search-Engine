// Searchbar Handler

$(function(){
    var searchField = $('#query');
    var icon = $('#search-btn');

    // Focus Event Handler
    $(searchField).on('focus', function(){
        $(this).animate({
            width:'100%'
        },400);
        $(icon).animate({
            right :'10px' // 10px to stay the same when streching
        },400);
    });

    //Blur Event Handler
    $(searchField).on('blur', function(){
        if(searchField.val() ==''){
            $(searchField).animate({
                width : '45%' // to return to orignal size
            },400 , function(){});
            $(icon).animate({
                right : '360px'
            },400, function(){});
        }
    });
    $('#search-form').submit(function(e){
        e.preventDefault();
    });
});

function search(){
     // clear results
    $('#results').html('');
    $('#buttons').html('');

    // Get Form Input
    q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part : 'snippet, id',
            q : q,
            type : 'video',
            key : 'AIzaSyBI_0Phb3au3U00p4JVYNwVanUAJMTU9Rc'},
            function(data){ // we are getting data
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                // console.log(data);
                // from log, we have items , and we want to loop through items
                $.each(data.items,function(i, item){
                    //we need to build html items
                    //Get Output
                    var output = getOutput(item);

                    // Display results
                    $('#results').append(output);
                });
                var buttons = getButtons(prevPageToken, nextPageToken);

                // Display Buttons
                $('#buttons').append(buttons);

            }
        );
}

//NEXT page function

function nextPage(){
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');
    // clear results
    $('#results').html('');
    $('#buttons').html('');

    // Get Form Input
    q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part : 'snippet, id',
            q : q,
            pageToken : token,
            type : 'video',
            key : 'AIzaSyBI_0Phb3au3U00p4JVYNwVanUAJMTU9Rc'},
            function(data){ // we are getting data
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                // console.log(data);
                // from log, we have items , and we want to loop through items
                $.each(data.items,function(i, item){
                    //we need to build html items
                    //Get Output
                    var output = getOutput(item);

                    // Display results
                    $('#results').append(output);
                });
                var buttons = getButtons(prevPageToken, nextPageToken);

                // Display Buttons
                $('#buttons').append(buttons);

            }
        );
}

//Prev page function

function prevPage(){
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');
    // clear results
    $('#results').html('');
    $('#buttons').html('');

    // Get Form Input
    q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part : 'snippet, id',
            q : q,
            pageToken : token,
            type : 'video',
            key : 'AIzaSyBI_0Phb3au3U00p4JVYNwVanUAJMTU9Rc'},
            function(data){ // we are getting data
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                // console.log(data);
                // from log, we have items , and we want to loop through items
                $.each(data.items,function(i, item){
                    //we need to build html items
                    //Get Output
                    var output = getOutput(item);

                    // Display results
                    $('#results').append(output);
                });
                var buttons = getButtons(prevPageToken, nextPageToken);

                // Display Buttons
                $('#buttons').append(buttons);

            }
        );
}


// Build output
function getOutput(item){
    // all of there var decleration and how to access them  are found in the youtube data api v3 reference by google
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;
    
    //Build output string

    var output = '<li>' +
	'<div class="list-left">' +
	'<img src="'+thumb+'">' +
	'</div>' +
	'<div class="list-right">' +
	'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
	'<p>'+description+'</p>' +
	'</div>' +
	'</li>' +
	'<div class="clearfix"></div>' +
    '';
    return output;
    //after here we went to css 

}

// Build the buttons
function getButtons(prevPageToken,nextPageToken){
    if (!prevPageToken){
        var btnoutput = '<div class = "button-container">'+
        '<button id = "next-button" class  ="paging-button" data-token = "'+nextPageToken+'" data-query ="'+q+'"' +
        'onclick = "nextPage();"> Next Page</button></div>';
    }else {
        var btnoutput = '<div class = "button-container">'+
        '<button id = "prev-button" class  ="paging-button" data-token = "'+prevPageToken+'" data-query ="'+q+'"' +
        'onclick = "prevPage()"> Prev Page</button>'+ 
        '<button id = "next-button" class  ="paging-button" data-token = "'+nextPageToken+'" data-query ="'+q+'"' +
        'onclick = "nextPage();">Next Page</button></div>';
    }
    return btnoutput;
}