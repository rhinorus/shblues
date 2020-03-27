angular
    .module("shblues")
    .controller("mainController", function MenuController($scope, $http) {
 
        $scope.menu = [
            {
                name: 'Видео',
                count: 5,
                anchorId: '#videos'
            },
            {
                name: 'Ша-Блюз треки',
                count: 7,
                anchorId: '#tracks'
            },
            {
                name: 'Мэшапы',
                count: 4,
                anchorId: '#mashups'
            },
            {
                name: 'Мелодекламации',
                count: 11,
                anchorId: '#melodclamations'
            },
            {
                name: 'Книги',
                count: 2,
                anchorId: '#books'
            } 
        ];

        $scope.scrollToAnchor = function(anchorId){
            alert('Scrolling to ' + anchorId);
        };

    });