angular.module('bankapp.controllers', ['bankapp.factories'])

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

    .controller('AccountsController', function ($scope, viewUtils, $stateParams) {
        $scope.showmessage = false;

        $scope.accounts = [
            {name: 'Current Account', tnx: 12000, number: '123456789 | 11-22-33', balance: 13500},
            {name: 'Credit Card', tnx: 852.50, number: '12345689***1234', balance: 1852.50},
            {name: 'Personal Loan', tnx: 12000, number: '123456789 | 11-22-33', balance: 1500}
        ]

        $rootScope.accounts = $scope.accounts;

        if ($stateParams.confirmed == "1") {
            $scope.showmessage = true;
            $scope.message = '<h4>Your payment was successful <i class="ion-close"  ng-click="hideConfirmation()"></i></h4>' +
                             '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod indum.</p>' +
                             '<a class="button" href="#">View details</a>';
        }

        $scope.hideConfirmation = function () {
            $scope.showmessage = false;
        }

        $scope.showConfirmation = function () {
            return $scope.showmessage;
        }


    })

    .controller('AccountDetails', function ($scope, $rootScope, $ionicNavBarDelegate, $stateParams, viewUtils) {
        $scope.pageTitle = viewUtils.setTitle('Current Account', '123456789 | 11-22-33');

        $scope.account = {name: 'Current Account', month: 'December, 2014', balance: 12000, available: 13500, overdraft: 1500};

        $scope.transactions = [
            {name: 'Sky Digital', date: '22/12/14', type: 'debit', amount: 20, account: {balance: 12000}},
            {name: 'Current Account', date: '22/12/14', type: 'credit', amount: 20, account: {balance: 11980}},
            {name: 'Amazon', date: '20/12/14', type: 'debit', amount: 20, account: {balance: 11960}},
            {name: 'Current Account', date: '22/12/14', type: 'credit', amount: 20, account: {balance: 11940}},
            {name: 'Tesco', date: '22/12/14', type: 'debit', amount: 20, account: {balance: 11920}},
            {name: 'Current Account', date: '22/12/14', type: 'credit', amount: 20, account: {balance: 11880}},
            {name: 'Current Account', date: '22/12/14', type: 'credit', amount: 20, account: {balance: 12860}},
            {name: 'Current Account', date: '22/12/14', type: 'credit', amount: 20, account: {balance: 12840}},
            {name: 'Current Account', date: '22/12/14', type: 'credit', amount: 20, account: {balance: 12820}},
            {name: 'Sky Digital', date: '22/12/14', type: 'debit', amount: 20, account: {balance: 12800}}
        ]

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
                $state.go('app.myaccount', {'confirmed': 0});
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

    .controller('PaymentsController', function ($scope, $state) {
        $scope.accounts = [
            {name: 'Current Account', month: 'December, 2014', number: '123456789 | 11-22-33', balance: 12000, available: 1500, overdraft: 1500},
            {name: 'Credit card', month: 'December, 2014', number: '123456789***1234 | Mastercard', balance: 1000, available: 1500, overdraft: 1500},
            {name: 'Current Account', month: 'December, 2014', number: '123456789 | 11-22-33', balance: 12000, available: 1500, overdraft: 1500}
        ]
        $scope.steps = [1, 2, 3];
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

    .controller('AlertController', function ($scope) {

        $scope.alerts = {transin: "£400", transout: "£1500", low: "£200", high: "£2500"};
        $scope.accounts = [
            {name: 'Current Account', month: 'December, 2014', number: '123456789 | 11-22-33', balance: 12000, available: 1500, overdraft: 1500},
            {name: 'Credit card', month: 'December, 2014', number: '123456789***1234 | Mastercard', balance: 1000, available: 1500, overdraft: 1500},
            {name: 'Current Account', month: 'December, 2014', number: '123456789 | 11-22-33', balance: 12000, available: 1500, overdraft: 1500}
        ]
        $scope.steps = [1, 2, 3];
        $scope.accountFrom = $scope.accounts[0];
        $scope.accountTo = $scope.accounts[1];
        $scope.activeTo = 0;
        $scope.activeFrom = 1;

    })

    .controller('BranchController', function ($scope, $state) {

    })


