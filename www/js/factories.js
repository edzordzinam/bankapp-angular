angular.module('bankapp.factories', [])

    .factory('viewUtils', ['$rootScope', '$ionicNavBarDelegate', function ($rootScope, $ionicNavBarDelegate) {
        var factory = [];

        factory.setTitle = function (main, sub) {
            if (typeof sub != 'undefined') {
                return '<span class="main">' + main + '</span> <span class="sub">' + sub + '</span>';
            } else {
                return main;
            }
        }

        factory.shuffleArray = function (o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        return factory;
    }])