angular
    .module("shblues")
    .controller("mainController", function MenuController($scope, $http, $window, $timeout) {
 
        $scope.showMenu = false
        $scope.showBigMenu = false;

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
 
        $window.onscroll = function(){
            $timeout(function(){
                if($window.scrollY > 900 && !$scope.showMenu){
                    $scope.showMenu = true;
                }
                else if($window.scrollY <= 900 && $scope.showMenu){
                    $scope.showMenu = false;
                    $scope.showBigMenu = false;
                } 
            }, 0);
        };
   
        $scope.scrollToAnchor = function(anchorId, closeTopMenu){
            $([document.documentElement, document.body]).animate({
                scrollTop: $(anchorId).offset().top  
            }, 2000); 

            if(closeTopMenu == true)
                $scope.showBigMenu = false;
        };

        $scope.toggleShowBigMenu = function(){
            $timeout(function(){
                $scope.showBigMenu = !$scope.showBigMenu;
            }, 0);
        };

    });