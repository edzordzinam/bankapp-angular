angular.module('bankapp.controllers', ['bankapp.factories', 'bankapp.services'])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('AccountsController', function ($scope, $rootScope, viewUtils, $stateParams, accountService) {
        $scope.showmessage = false;
        $scope.direction = '';
        var accounts = accountService.getAccounts();

        $scope.accounts = accounts['accounts'];

        if ($stateParams.confirmed == "1") {
            $scope.showmessage = true;
        }

        $scope.hideConfirmation = function () {
            $scope.showmessage = false;
        }

        $scope.showConfirmation = function () {
            return $scope.showmessage;
        }
    })

    .controller('AccountDetails', function ($filter, $scope, $rootScope, $ionicNavBarDelegate, $stateParams, viewUtils, accountService) {
        //get accounts and set page title
        var accounts = accountService.getAccounts();
        $scope.account = accounts['accounts'][$stateParams.index];
        $scope.pageTitle = viewUtils.setTitle($scope.account.name, $scope.account.number);

        $scope.month = $filter('date')((new Date).getTime(), 'MMMM, yyyy');

        $scope.transactions = accountService.getAccountTransactions($stateParams.index, 12);

        $scope.show_section = null;
        $scope.expandedclass = '';

        $scope.patient = {
            allergies: [{label: 'bread'}, {label: 'butter'}]
        };

        $scope.details_click = function (index, $event) {
            if ($scope.show_section == index) {
                $scope.show_section = null;
                $scope.expandedclass = '';
                return;
            }

            $scope.expandedclass = 'expanded';
            $scope.show_section = index;
        };

        $scope.showDetails = function (index) {
            return ($scope.show_section);
        }

        $scope.shuffle = function () {
            $scope.transactions = viewUtils.shuffleArray($scope.transactions);
        }
    })

    .controller('LoginController', function ($scope, $state, $stateParams) {
        $scope.creds = {passcode: '', count: 0};

        $scope.verifyPasscode = function ($event) {
            if (parseInt($scope.creds.passcode) === 12345) {
                $scope.creds.passcode = '';
                $state.go('app.myaccounts', {'confirmed': 0});
            }
        }
    })

    .controller('RegisterController', function ($scope, $state, $stateParams) {
        $scope.creds = {passcode: '', count: 0};

        $scope.verifyPasscode = function ($event) {
            if (parseInt($scope.creds.passcode) === 12345) {
                $state.go('app.login');
            }
            else if (parseInt($scope.creds.passcode) === 99999) {
                $state.go('app.register3');
            }
        }

        $scope.gotoStep = function (step) {
            $state.go('app.register' + step);
        }
    })

    .controller('PaymentsController', function ($scope, $rootScope, $state, accountService) {
        var accounts = accountService.getAccounts();
        $scope.accounts = accounts['accounts'];
        $scope.metadata = accounts['metadata'];

        $scope.accountFrom = $scope.accounts[0];
        $scope.accountTo = $scope.accounts[1];
        $scope.activeTo = 0;
        $scope.activeFrom = 1;

        $scope.payment = {amount: 0, deposit: 130, receivertype: 0};


        $scope.getReceiverType = function () {
            return $scope.payment.receivertype;
        }

        $scope.setReceiverType = function (index) {
            $scope.payment.receivertype = index;
        }

        $scope.gotoRecipient = function () {
            $state.go('app.recipient');
        }
    })

    .controller('RecipientsController', function ($scope, $state) {

    })

    .controller('DepositController', function ($scope, $state) {
        $scope.creds = {vericode: '', count: 0};

        $scope.verifyPasscode = function ($event) {
            if (parseInt($scope.creds.vericode) == 1234567890) {
                $state.go('app.selectaccount');
            }
        }
    })

    .controller('AlertController', function ($scope, accountService) {
        var accounts = accountService.getAccounts();
        $scope.accounts = accounts['accounts'];
        $scope.metadata = accounts['metadata'];

        $scope.alerts = {transin: "£400", transout: "£1500", low: "£200", high: "£2500"};

        $scope.steps = [1, 2, 3];
        $scope.accountFrom = $scope.accounts[0];
        $scope.accountTo = $scope.accounts[1];
        $scope.activeTo = 0;
        $scope.activeFrom = 1;

    })

    .controller('BranchController', function ($scope, $state) {
        $scope.gotoNBD = function(){
            $state.go('app.nbd')
        }
    })

    .controller('DocumentsController', function ($scope, accountService) {
        var accounts = accountService.getAccounts();
        $scope.accounts = accounts['accounts'];
        $scope.metadata = accounts['metadata'];
        $scope.month = (new Date()).getTime();

        $scope.documents = accountService.getAccountDocuments();
    })

    .controller('ProductsController', function ($scope, accountService) {
        $scope.products = accountService.getProducts();
    })

    .controller('SettingsController', function ($scope) {

    })
