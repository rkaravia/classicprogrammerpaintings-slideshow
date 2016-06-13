angular.module('cppSlideApp').factory('TumblrPosts', function($http, $q) {
    var API_KEY = 'cwfAs4YdGYRFJwa93IdlKJYLeuAnjWhT54nUg2qVceXqdJzUA9';
    var BASE_URL = 'https://api.tumblr.com/v2/blog/';
    var BLOG_ID = 'classicprogrammerpaintings.com';

    function getPhotoPosts(offset) {
        var url = BASE_URL + BLOG_ID + '/posts/photo';
        return $http.jsonp(url, {params: {
            api_key: API_KEY,
            callback: 'JSON_CALLBACK',
            offset: offset
        }});
    }

    function parsePosts(posts) {
        return posts.map(function(post) {
            var photo = post.photos[0];
            return {
                caption: post.caption,
                summary: post.summary,
                photo: photo.alt_sizes[0].url,
                photo_small: photo.alt_sizes[Math.max(0, photo.alt_sizes.length - 3)].url
            }
        });
    }

    function getAllPhotoPosts() {
        return $q(function(resolve) {
            var allPosts = [];
            fetchRecursive();

            function fetchRecursive() {
                getPhotoPosts(allPosts.length).then(function(response) {
                    response = response.data.response;
                    allPosts = allPosts.concat(parsePosts(response.posts));
                    if (allPosts.length < response.total_posts) {
                        fetchRecursive();
                    } else {
                        resolve(allPosts);
                    }
                });
            }
        });
    }

    return {
        getAllPhotoPosts: getAllPhotoPosts
    };
});
