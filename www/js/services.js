angular.module('bankapp.services', [])

    .service('accountService', function () {
        //get all accounts //via http service or other data service
        this.getAccounts = function () {
            var accounts = [
                {name: 'Current Account', tnx: 12000, number: '123456789 | 11-22-33', balance: 12000, available: 13500, overdraft: 1500},
                {name: 'Credit Card', tnx: 852.50, number: '12345689***1234', balance:852.50,available: 1852.50, overdraft: 1000},
                {name: 'Personal Loan', tnx: 12000, number: '123456789 | 11-22-33', balance: 552.20, available: 1500, overdraft: 947.5}
            ]

            var metadata = {activeAccount: 0, noOfAccounts: 3}


            return {'accounts' : accounts, 'metadata' : metadata};
        };

        //gets all transactions for month
        this.getAccountTransactions = function(account, month){
            var transactions = [
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

            return transactions;
        };

        //get account associated documents
        this.getAccountDocuments = function(){
            var docs = [
                {date : (new Date('12/12/2014')).getTime(), title : 'Annual Statement', summary : 'Lorem ipsum dolar antler conster'},
                {date : (new Date('11/24/2014')).getTime(), title : 'November Statement', summary : 'Lorem ipsum dolar antler conster'},
                {date : (new Date('1/16/2014')).getTime(), title : 'Renewal Letter', summary : 'Lorem ipsum dolar antler conster'}
            ]
            return docs;
        }

        this.getProducts = function(){
            var products = [
                {name : "Savings", summary : 'To help you plan for the future'},
                {name : "Borrowing/loans", summary : 'Personal loans, Credit cards and Overdrafts'},
                {name : "Mortgages", summary : 'To help you every step of the way to owning your own home'}
            ]
            return products;
        }

    })