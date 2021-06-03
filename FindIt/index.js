import reddit from './redditapi';


const searchForm=document.getElementById('search-form');
const searchInput=document.getElementById('search-input');

searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    // Get search term
    const searchTerm =searchInput.value;
    // Get sort
    const sortBy=document.querySelector('input[name="sortby"]:checked').value;
    // GEt limit
    const searchLimit=document.getElementById('limit').value;
    // check input
    if(searchTerm===''){
        // show message
        showMessage('Please add a search Term','alert-danger');
    }
    // clear Input
    searchInput.value='';

    // search Reddit
    reddit.search(searchTerm,searchLimit,sortBy).then(results=>{
        let output='<div class="card-columns">';

        // loop through posts
        results.forEach(post=>{

            // check for images
            const image=post.preview ? post.preview.images[0].source.url :'https://images.pexels.com/photos/5437588/pexels-photo-5437588.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

            output+=`
            <div class="card">
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncateText(post.selftext,100)}</p>
                    <a href="${post.url}" target="_blank" class="btn btn-primary">Read more</a>
                    <hr>
                    <span class="badge badge-secondary">Subreddit :${post.subreddit}</span>
                    <span class="badge badge-dark">Score :${post.score}</span>
                </div>
            </div>
            `;
        });

        output+='</div>';
        document.getElementById('results').innerHTML=output;

    });

});



// show message

function showMessage(message,className){
    // create div
    const div =document.createElement('div');
    // Add classes
    div.className=`alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const searchContainer=document.getElementById('search-container');
    // Get search
    const search =document.getElementById('search');

    // Insert message
    searchContainer.insertBefore(div,search);

    // Timeout alert
    setTimeout(()=>{
        document.querySelector('.alert').remove();
    },3000);
};


// truncate text

function truncateText(text,limit){
    const shortened=text.indexOf('',limit);
    if(shortened==-1){
        return text;
    }
    return text.substring(0,shortened);
}