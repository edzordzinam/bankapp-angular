// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'bankapp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'bankapp.controllers' is found in controllers.js
angular.module('bankapp', ['ionic', 'bankapp.controllers', 'bankapp.directives', 'bankapp.filters', 'bankapp.factories'])

    .run(function ($ionicPlatform, $rootScope) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            ionic.Platform.isFullScreen = true;
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        controller: "LoginController",
                        templateUrl: "templates/login.html"
                    }
                }
            })
            .state('app.login2', {
                url: "/login2",
                views: {
                    'menuContent': {
                        controller: "LoginController",
                        templateUrl: "templates/login-blue.html"
                    }
                }
            })

            .state('app.register', {
                url: "/register",
                views: {
                    'menuContent': {
                        controller: "RegisterController",
                        templateUrl: "templates/register-home.html"
                    }
                }
            })

            .state('app.register1', {
                url: "/register1",
                views: {
                    'menuContent': {
                        controller: "RegisterController",
                        templateUrl: "templates/register-step-one.html"
                    }
                }
            })
            .state('app.register2', {
                url: "/register2",
                views: {
                    'menuContent': {
                        controller: "RegisterController",
                        templateUrl: "templates/register-step-two.html"
                    }
                }
            })

            .state('app.register3', {
                url: "/register3",
                views: {
                    'menuContent': {
                        controller: "RegisterController",
                        templateUrl: "templates/register-step-three.html"
                    }
                }
            })

            .state('app.myaccount', {
                url: "/myaccount/:confirmed",
                views: {
                    'menuContent': {
                        controller: "AccountsController",
                        templateUrl: "templates/myaccount.html"
                    }
                }
            })

            .state('app.accountdetails', {
                url: "/accountdetails",
                views: {
                    'menuContent': {
                        controller: "AccountDetails",
                        templateUrl: "templates/account-details.html"
                    }
                }
            })

            .state('app.payments', {
                url: "/payments",
                views: {
                    'menuContent': {
                        controller: "PaymentsController",
                        templateUrl: "templates/payments_transfers.html"
                    }
                }
            })

            .state('app.recipient', {
                url: "/recipient",
                views: {
                    'menuContent': {
                        controller: "RecipientsController",
                        templateUrl: "templates/recipient.html"
                    }
                }
            })

            .state('app.checkdeposit', {
                url: '/checkdeposit',
                views: {
                    'menuContent': {
                        controller: 'DepositController',
                        templateUrl: "templates/check_deposit.html"
                    }
                }
            })

            .state('app.selectaccount', {
                url: '/selectaccount',
                views: {
                    'menuContent': {
                        controller: 'PaymentsController',
                        templateUrl: "templates/select_account.html"
                    }
                }
            })

            .state('app.confirmdeposit', {
                url: '/confirmdeposit',
                views: {
                    'menuContent': {
                        controller: 'PaymentsController',
                        templateUrl: "templates/confirm_deposit.html"
                    }
                }
            })
            .state('app.confirmpayment', {
                url: '/confirmpayment',
                views: {
                    'menuContent': {
                        controller: 'PaymentsController',
                        templateUrl: "templates/confirm_payment.html"
                    }
                }
            })

            .state('app.limitalert', {
                url: '/limitalert',
                views: {
                    'menuContent': {
                        controller: 'AlertController',
                        templateUrl: 'templates/limit_alert.html'
                    }
                }
            })

            .state('app.weeklybalance', {
                url: '/weeklybalance',
                views: {
                    'menuContent': {
                        controller: 'AlertController',
                        templateUrl: 'templates/weeklybalance.html'
                    }
                }
            })

            .state('app.transalert', {
                url: '/transalert',
                views: {
                    'menuContent': {
                        controller: 'AlertController',
                        templateUrl: 'templates/transaction_alert.html'
                    }
                }
            })

            .state('app.notifications', {
                url: '/notifications',
                views: {
                    'menuContent': {
                        controller: 'AlertController',
                        templateUrl: 'templates/notifications.html'
                    }
                }
            })

            .state('app.branchatms', {
                url: '/branchatms',
                views: {
                    'menuContent': {
                        controller: 'BranchController',
                        templateUrl: 'templates/branch_atms.html'
                    }
                }
            })
            .state('app.branchatms2', {
                url: '/branchatms2',
                views: {
                    'menuContent': {
                        controller: 'BranchController',
                        templateUrl: 'templates/branch_atms2.html'
                    }
                }
            })
            .state('app.branchatms3', {
                url: '/branchatms3',
                views: {
                    'menuContent': {
                        controller: 'BranchController',
                        templateUrl: 'templates/branch_atms3.html'
                    }
                }
            })
            .state('app.faq', {
                url: '/faq',
                views: {
                    'menuContent': {
                        controller: 'BranchController',
                        templateUrl: 'templates/faq.html'
                    }
                }
            })

            .state('app.docs', {
                url: '/docs',
                views: {
                    'menuContent': {
                        controller: 'BranchController',
                        templateUrl: 'templates/documents.html'
                    }
                }
            })
            .state('app.products', {
                url: '/products',
                views: {
                    'menuContent': {
                        controller: 'BranchController',
                        templateUrl: 'templates/products.html'
                    }
                }
            })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/register');
    });
