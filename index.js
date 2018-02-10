// 1. i want to submit my site to localStorage => i need an event on this submit form
// 2. i want to get the values that i pass in the form
// 3. create 2 variables for our form values 
// 4. create an object ready to submit to localStorage, we need another variable
// 5. save the obj bookmark that we've created in localSotage - if else
// 6. we want to add the bookmark that we're submitting to that array
// 7. everything it's in local storage we want to display in the wabpage => i need another function
// 8. in the div with id bookmarksResults, and put there the results after we fetch them
//9. loop through the bookmarks that are in the localStorage, the output them one by one inside the div
// 10. need to create deleteBookmarks function

document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e) {
    // get form values. let's get the input. the .value permit me to store the value i type in the siteName and siteUrl
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName, siteUrl)){
        return false;
    }


    var bookmark = {
        name: siteName,
        url: siteUrl,
    }
    // Local storage test - (key, value)
    /* localStorage.setItem('test', 'hello');
    localStorage.getItem('test');
    localStorage.removeItem('test'); */
    
    // test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null ){
        // init array
        var bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from local storage
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      // add bookmark to array
      bookmarks.push(bookmark);
      // set back to local storage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

// clear form without loading the page
document.getElementById('myForm').reset();

    // re-fetch bookmarks
    fetchBookmarks();
    // prevent form from submitting
    e.preventDefault();
}

// delet bookmarks
function deleteBookmark(url){
    // fetch the bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop throught them, and check to see if the current one we're looping through matches this URL
    for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url === url) {
// if does we're going to splice() it out, and then reset localStorage - REMOVE FROM ARRAY 
            bookmarks.splice(i, 1); // i = current iteration
                                    // 1 = splice out 1 elem from array    
        }
}
    // re-set back from localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    // re-fetch bookmarks
    fetchBookmarks();
}





// fetch bookmarks
function fetchBookmarks(){
    // get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    // get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    bookmarksResults.innerHTML = "";
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        // [i] to get the current iteration
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +                                  '<h3>' +name+ 
                                        '<a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a>' + 
                                        '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#"'+url+'">Delete</a>'
                                                '</h3>' +    
                                            '</div>';
    } 

}
// VALIDATION : 
function validateForm(siteName, siteUrl){
    // if there are not url or name don't save any empty url, but alert to fill the form
if(!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false; // to stop keep going
}

// regular expression for url
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if(!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
}
return true; // if passes we want to return true
}