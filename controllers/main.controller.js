angular
    .module("shblues") 
    .controller("mainController", function MenuController($scope, $mdDialog, $window, $timeout, $sce) {
 
        //========================
        // Base settings
        //========================

        $scope.showMenu = false
        $scope.showBigMenu = false;
        $scope.activeTrack = null; 
        $scope.isPlayerActive = false;
        $scope.amplitudeInited = false;
        $scope.isEnglish = false; //load from cookies later

        //========================
        // Settings
        //========================

        $scope.videos = videos;
        $scope.tracks = tracks;
        $scope.mashups = mashups;
        $scope.mashupsImages = mashupsImages;
        $scope.melodclamations = melodclamations;
        $scope.books = books;
        $scope.social = social;

        $scope.announcements = announcements;
        $scope.recomendations = recomendations;
 
        //========================
        // Menu
        //========================

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
                count: 3,
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

        //========================
        // Methods
        //========================

        $scope.processVideos = function(){
            for(var video of $scope.videos){
                var id = video.url.split("?v=")[1];
                if(id.includes('&'))
                    id = id.split('&')[0];
                video.id =  $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + id);
                video.src = "http://i3.ytimg.com/vi/" + id + "/default.jpg";
            }
            
        };

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

                if($scope.activeTrack != null){
                    $scope.activeTrack.active = false;
                    Amplitude.pause();
                    Amplitude.removeSong(0);
                }
                    
                $scope.activeTrack = track;
               
                $scope.playAudio(track.name, track.file); 
            }
            else{
                track.active = false;
                $scope.activeTrack = null;
                $scope.isPlayerActive = false;

                Amplitude.pause();
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
                case 'addictional':
                    if(index >= 10) 
                        return true;
                    break;
                default:
                    break;
            }

            return false;
        };
 
        $scope.showVideo = function(index, video){

            $scope.turnAudioOff();

            function DialogController($scope, $mdDialog, parent, index, video) {   
                
                $scope.parent = parent;
                $scope.index = index;
                $scope.video = video;
                
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                
                $scope.previousVideo = function(){
                    $scope.index -= 1;
                    if($scope.index < 0)
                        $scope.index = $scope.parent.videos.length - 1;
                    else
                        $scope.index = $scope.index % $scope.parent.videos.length;

                    $scope.parent.showVideo($scope.index, $scope.parent.videos[$scope.index]);
                    $scope.hide();
                };

                $scope.nextVideo = function(){
                    $scope.index += 1;
                    $scope.index = $scope.index % $scope.parent.videos.length;

                    $scope.parent.showVideo($scope.index, $scope.parent.videos[$scope.index]);
                    $scope.hide();
                };
            }
    
            $mdDialog.show({
                controller: DialogController,
                locals: {
                    parent: $scope,
                    index: index,
                    video: video
                },
                template: 
                        '<div class="tv-container" ng-cloak> ' +
                            '<div class="tv-black-background"></div>' +
                            '<iframe class="tv-frame" ng-src="{{video.id}}"></iframe>' +
                            '<img class="tv" src="data/assets/images/tv.png">' +
                            '<img class="tv-btn-previous" ng-click="previousVideo()" src="data/assets/images/tv-turn.png" >' +
                            '<img class="tv-btn-next" ng-click="nextVideo()" src="data/assets/images/tv-turn.png" >' +
                            '<img class="tv-arrow-right" src="data/assets/images/turn-arrow.png" >' +
                            '<img class="tv-arrow-left" src="data/assets/images/turn-arrow.png" >' +
                        '</div>', 

                clickOutsideToClose: true
              })
              .then(function() {
                // окно закрыто по кнопке
              }, function() {
                // закрытие окна по клику вне
            });
        };
 
        $scope.playAudio = function(name, filePath){

            if(!$scope.amplitudeInited){
                Amplitude.init({
                    "songs": [
                      {
                        "name": name,
                        "artist": "Ша-Блюз",
                        "url": filePath
                      }
                    ],
                    "callbacks": {
                        'ended': function(){
                            $timeout(function() {
                                $scope.isPlayerActive = false;
                                $scope.setActive($scope.activeTrack);
                            },0)
                        }
                    }
                  });

                  document.getElementById('song-played-progress').addEventListener('click', function( e ){
                    var offset = this.getBoundingClientRect();
                    var x = e.pageX - offset.left;
                
                    Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
                  });        
            }
            else{
                $scope.turnAudioOff();
                Amplitude.addSong({
                    "name": name,
                    "artist": "Ша-Блюз",
                    "url": filePath
                  });
            }

              $scope.isPlayerActive = true;

              var turnAudioOff = function(){
                $timeout(function() {
                    $scope.turnAudioOff();
                }, 0);
            };

              Amplitude.play();
              $timeout(function(){ 
                $("#play-pause").addClass("amplitude-playing");
                $("#play-pause").removeClass("amplitude-paused"); 

                var controlContainer = document.getElementsByClassName("control-container")[0];
                var stopButton = document.createElement("div");

                var clickAttribute = document.createAttribute("ng-click");       
                clickAttribute.value = "turnAudioOff()";    
 
                stopButton.onclick = turnAudioOff;
                stopButton.className = "music-off";

                controlContainer.appendChild(stopButton);

              },0);
        };
 
        $scope.turnAudioOff = function(){
            $timeout(function(){
                if($scope.isPlayerActive){
                    $scope.isPlayerActive = false;
                    $scope.setActive($scope.activeTrack);
                }
            },0);
        };
 

        $scope.showAnnouncements = function(){

            $scope.turnAudioOff();

            function DialogController($scope, $mdDialog, parent, announcements) {   
                
                $scope.parent = parent;
                $scope.announcements = announcements;
                
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                
            }
    
            $mdDialog.show({
                controller: DialogController,
                locals: {
                    parent: $scope,
                    announcements: $scope.announcements
                },
                template: 
                        '<div class="video-modal" ng-cloak> ' +
                            '<div class="vm-header">' + 
                                '<div class="vm-header-label">Анонсы</div>' +
                                '<img class="close-image" src="data/assets/images/close.png" label="close" ng-click="hide()">' +
                            '</div>' +
                            '<div class="about-video">{{announcements.name}}</div>' + 
                            '<div class="announcements-description" ng-bind-html="announcements.description"></div>' +
                            '<div class="announcements-image-wapper" ng-show="announcements.image != null">' + 
                                '<img src="{{announcements.image}}">' +
                            '</div>' +
                        '</div>',

                clickOutsideToClose: true
              })
              .then(function() {
                // окно закрыто по кнопке
              }, function() {
                // закрытие окна по клику вне
            });
        };

        $scope.showRecomendations = function(){
           
            $scope.turnAudioOff();

            function DialogController($scope, $mdDialog, parent, recomendations) {   
                
                $scope.parent = parent;
                $scope.recomendations = recomendations;
                
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                
            }
    
            $mdDialog.show({
                controller: DialogController,
                locals: {
                    parent: $scope,
                    recomendations: $scope.recomendations
                },
                template: 
                        '<div class="video-modal" ng-cloak> ' +
                            '<div class="vm-header">' + 
                                '<div class="vm-header-label">Рекомендации</div>' +
                                '<img class="close-image" src="data/assets/images/close.png" label="close" ng-click="hide()">' +
                            '</div>' +
                            '<div class="about-video">{{recomendations.name}}</div>' + 
                            '<div class="announcements-description" ng-bind-html="recomendations.description"></div>' +
                            '<div class="announcements-image-wapper" ng-show="recomendations.image != null">' + 
                                '<img src="{{recomendations.image}}">' +
                            '</div>' +
                        '</div>',

                clickOutsideToClose: true
              })
              .then(function() {
                // окно закрыто по кнопке
              }, function() {
                // закрытие окна по клику вне
            });
        };

        $scope.toggleEnglish = function(){
            $scope.isEnglish = !$scope.isEnglish;
        };

    });