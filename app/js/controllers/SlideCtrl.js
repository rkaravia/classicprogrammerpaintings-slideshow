angular.module('cppSlideApp').controller('SlideCtrl', function($scope, $timeout, TumblrPosts) {
    TumblrPosts.getAllPhotoPosts().then(function(posts) {
        $scope.slides = posts;
    });
});
