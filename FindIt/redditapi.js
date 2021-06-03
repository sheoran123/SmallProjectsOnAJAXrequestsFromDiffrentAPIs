export default{
    search:function(searchTerm,searchLimit,sortBy){
        return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
        .then(res=>{return res.json()})
        .then(data=>data.data.children.map(data=>data.data))
    }
};