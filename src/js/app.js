angular.module('app', ['ngRoute', 'ngDialog'])

.config(['$routeProvider',
            function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html'
            })
            .when('/game', {
                templateUrl: 'partials/game.html'
            })
            .when('/options', {
                templateUrl: 'partials/options.html'
            })
            .when('/credits', {
                templateUrl: 'partials/credits.html'
            })
            .otherwise({
                redirectTo: '/'
            });
            }])

.controller('homeCtrl', function () {

})

.controller('gameCtrl', function ($scope, ngDialog) {
    var clock = {
        stage: {},
        game: {},
        clock: {},
        hourHand: {},
        minuteHand: {},
        hour: 0,
        minute: 0,
        hours: {},
        minutes: {},
        dayPart: '',
        init: function () {
            var that = this;
            this.stage = new Kinetic.Stage({
                container: 'game',
                width: 200,
                height: 207
            });
            this.game = new Kinetic.Layer();
            this.clock = new Image();
            this.hourHand = new Image();
            this.minuteHand = new Image();

            this.clock.onload = function () {
                that.game.add(
                    new Kinetic.Image({
                        image: that.clock,
                        width: 200,
                        height: 207
                    }));
                that.stage.add(that.game);
            };

            this.hourHand.onload = function () {
                that.hours = new Kinetic.Image({
                    image: that.hourHand,
                    x: 100,
                    y: 100,
                    width: 2,
                    height: 40,
                    offsetX: 1
                });
                that.hours.rotate(180)
                    .currentRotation = 0;
                that.game.add(that.hours);
                that.stage.add(that.game);
            };

            this.minuteHand.onload = function () {
                that.minutes = new Kinetic.Image({
                    image: that.minuteHand,
                    x: 100,
                    y: 100,
                    width: 2,
                    height: 60,
                    offsetX: 1
                });
                that.minutes.rotate(180)
                    .currentRotation = 0;
                that.game.add(that.minutes);
                that.stage.add(that.game);
                
                that.randomHour();
            };

            this.clock.src = 'img/clock3.png';
            this.hourHand.src = 'img/secondHand.png';
            this.minuteHand.src = 'img/firstHand.png';


        },
        randomHour: function () {
            this.hour = _.random(1, 12);
            this.dayPart = (this.hour < 12) ? 'Matin' : 'Après-Midi';
            var r = this.hour * 30;
            this.hours.rotate(r - this.hours.currentRotation)
                .currentRotation = r;

            var m = _.random(0, 11);
            this.minute = m * 5;
            this.minutes.rotate(m * 30 - this.minutes.currentRotation)
                .currentRotation = m * 30;
            this.game.draw();
        }
    };

    var game = {
        inputHour: 0,
        inputMinute: 0,
        init: function () {

        },
        replay: function () {
            setTimeout(function(){
                clock.randomHour();
            }, 0);
        },
        check: function () {
            if (this.inputHour == clock.hour && this.inputMinute == clock.minute) {
                ngDialog.open({
                    template: 'partials/popupSuccess.html',
                    showClose: false
                });
            } else {
                ngDialog.open({
                    template: 'partials/popupFail.html',
                    showClose: false,
                    scope: $scope
                });
            }
        },
        selectClock: function(clock){
            console.log('clock');
            console.log(clock);
        }
    };
    $scope.game = game;
    $scope.clock = clock;
    clock.init();
})

.controller('optionsCtrl', function (gameCtrl) {
 
})

.controller('creditsCtrl', function () {

});