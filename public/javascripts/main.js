var add_post_a = document.getElementById('add-post-a');
var displaying_posts = document.getElementById('displaying-posts');
var writing_posts = document.getElementById('writing-posts');
var post_input = document.getElementById('post-input');
var back_to_list = document.getElementById('back-to-list');
var a_post = document.getElementById('a_post');
var search_post = document.getElementById('search_post');

add_post_a.addEventListener('click', function(e){
    displaying_posts.style.display='none';
    add_post_a.style.display='none';
    back_to_list.style.display = 'block';
    writing_posts.style.display='block';
    search_post.style.display='none';
});

// post_input.addEventListener('click', function(e){
//     writing_posts.style.display='none';
//     displaying_posts.style.display='block';
//     add_post_a.style.display='block'; 
//     back_to_list.style.display='block';
// });

back_to_list.addEventListener('click', function(e){
    writing_posts.style.display='none';
    a_post.style.display='none';
    displaying_posts.style.display='block';
    add_post_a.style.display='block';  
});