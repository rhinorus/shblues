angular
    .module("shblues")
    .controller("mainController", function MenuController($scope, $http, $window, $timeout) {
 
        $scope.showMenu = false
        $scope.showBigMenu = false;
        $scope.activeTrack = null; 

        $scope.videos = [
            {
                name: 'Не орёл',
                url: 'https://www.youtube.com/watch?v=AtdWfLLSBtI'
            },
            {
                name: 'Blue bird',
                url: 'https://www.youtube.com/watch?v=OFt_4o6dqGk'
            },
            {
                name: 'Fumo di mentolo',
                url: 'https://www.youtube.com/watch?v=YtvILC9r14E'
            },
            {
                name: 'КУРИТЬ',
                url: 'https://www.youtube.com/watch?v=hydZYpXTnrE'
            }, //4
            {
                name: 'TRAIN',
                url: 'https://www.youtube.com/watch?v=2KYLw194c9w'
            },
            {
                name: 'ПРО КОНЯ',
                url: 'https://www.youtube.com/watch?v=3C6gljuFs6c'
            },
            {
                name: 'GodKnows',
                url: 'https://www.youtube.com/watch?v=baQUqhkI5vk'
            },
            {
                name: 'ADULT CONTENT',
                url: 'https://www.youtube.com/watch?v=0QxkSGkid54'
            }, //8
            {
                name: 'HORSE APOCALIPTIC 2018',
                url: 'https://www.youtube.com/watch?v=YuUAQa274Jw'
            }, 
            {
                name: 'ТРИ РАЗГОВОРА',
                url: 'https://www.youtube.com/watch?v=ZCnNNTn9ljY'
            },
            {
                name: 'Ты узнаешь меня',
                url: 'https://www.youtube.com/watch?v=WmLktht66T8'
            },
            {
                name: 'ХаZZбулат',
                url: 'https://www.youtube.com/watch?v=qxfYx6rHyXI'
            }, //12
            {
                name: '2 танцора',
                url: 'https://www.youtube.com/watch?v=xn8t4R-QWWU'
            },
            {
                name: 'MOM',
                url: 'https://www.youtube.com/watch?v=8I2NzV3jXeA'
            },
            {
                name: 'Че',
                url: 'https://www.youtube.com/watch?v=Xi26azONVUc'
            },
            {
                name: 'Love for Sale',
                url: 'https://www.youtube.com/watch?v=v72s4UyNoDs'
            },

        ]; 
  
        $scope.tracks = [
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            },
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            },
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            },
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            }, //4
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            },
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            },
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            },
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            }, //8
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            },
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            },
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            },
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            }, //12
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            },
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            },
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            },
            {
                name: 'Молодца и сопли красят',
                description: 'Какое-то описание трека. Длинное описание, хоть и не очень.',
                file: 'data/assets/tracks/01.wav'
            }
        ];

        $scope.mashups = [
            {
                name: 'Очень очень очень длинное название',
                img: 'data/assets/images/tsoi.png',
                date: '01.01.1900',
                file: '/assets/tracks/01.wav'
            },
            {
                name: 'Очень очень очень длинное название',
                img: 'data/assets/images/tsoi.png',
                date: '01.01.1900',
                file: '/assets/tracks/01.wav'
            },
            {
                name: 'Очень очень очень длинное название',
                img: 'data/assets/images/tsoi.png',
                date: '01.01.1900',
                file: '/assets/tracks/01.wav'
            },
            {
                name: 'Очень очень очень длинное название',
                img: 'data/assets/images/tsoi.png',
                date: '01.01.1900',
                file: '/assets/tracks/01.wav'
            }, //4
            {
                name: 'Очень очень очень длинное название',
                img: 'data/assets/images/tsoi.png',
                date: '01.01.1900',
                file: '/assets/tracks/01.wav'
            },
            {
                name: 'Очень очень очень длинное название',
                img: 'data/assets/images/tsoi.png',
                date: '01.01.1900',
                file: '/assets/tracks/01.wav'
            },
            {
                name: 'Очень очень очень длинное название',
                img: 'data/assets/images/tsoi.png',
                date: '01.01.1900',
                file: '/assets/tracks/01.wav'
            },
            {
                name: 'Очень очень очень длинное название',
                img: 'data/assets/images/tsoi.png',
                date: '01.01.1900',
                file: '/assets/tracks/01.wav'
            }, //8
            {
                name: 'Очень очень очень длинное название',
                img: 'data/assets/images/tsoi.png',
                date: '01.01.1900',
                file: '/assets/tracks/01.wav'
            },
            {
                name: 'Очень очень очень длинное название',
                img: 'data/assets/images/tsoi.png',
                date: '01.01.1900',
                file: '/assets/tracks/01.wav'
            }
        ];
 
        $scope.menu = [
            {
                name: 'Видео',
                count: $scope.videos.length,
                anchorId: '#videos'
            },
            {
                name: 'Ша-Блюз треки',
                count: $scope.tracks.length,
                anchorId: '#tracks'
            },
            {
                name: 'Мэшапы',
                count: $scope.mashups.length,
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
            },
            {
                name: 'Комикс',
                count: '',
                anchorId: '#comics'
            }
        ];

        $scope.processVideos = function(){
            for(var video of $scope.videos){
                var id = video.url.split("?v=")[1];
                if(id.includes('&'))
                    id = id.split('&')[0];
                video.id = id;
                video.src = "http://i3.ytimg.com/vi/" + id + "/hqdefault.jpg";
            }
            
        }

        $scope.processVideos();
 
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

        $scope.setActive = function(track){

            if($scope.activeTrack != track){
                track.active = true;

                if($scope.activeTrack != null)
                    $scope.activeTrack.active = false;
                $scope.activeTrack = track;
            }
            else{
                track.active = false;
                $scope.activeTrack = null;
            }  
        };
 
        $scope.isMashupAllowed = function(index, location){
            switch(location){
                case 'top-first-row':
                    if(index < 2)
                        return true;
                    break;
                case 'top-second-row':
                    if(index > 1 && index < 4)
                        return true;
                    break;
                case 'center':
                    if(index > 3 && index < 8)
                        return true;
                    break;
                case 'bottom':
                    if(index > 7 && index < 10)
                        return true;
                    break;
                default:
                    break;
            }

            return false;
        }

    });