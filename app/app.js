/**
 * Created by Hung on 4/26/16.
 */

var app = angular.module('app', ["commonServices", "ui.router","productResourceMock"]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/welcomeView.html'
        })

        .state('productList', {
            url: '/products',
            templateUrl: 'app/products/productListView.html',
            controller: 'productListCtrl'
        })

        .state('productEdit', {
            abstract: true,
            url: '/products/edit/:productId',
            templateUrl: 'app/products/productEditView.html',
            controller: 'productEditCtrl',
            resolve: {
                productResource  : "productResource",
                // this product will be inject into the productDetailCtrl
                product: function (productResource, $stateParams) {
                    var productId = $stateParams.productId;
                    return productResource.get({ productId: productId }).$promise;
                }
            }
        })
        .state('productEdit.info', {
            url: '/info',
            templateUrl: 'app/products/productEditInfoView.html'
        })
        .state('productEdit.price', {
            url: '/price',
            templateUrl: 'app/products/productEditPriceView.html'
        })
        .state('productEdit.tags', {
            url: '/tags',
            templateUrl: 'app/products/productEditTagsView.html'
        })

        .state('productDetailView', {
            url: '/products/:productId',
            templateUrl: 'app/products/productDetailView.html',
            controller: 'productDetailCtrl',
            resolve: {
                productResource  : "productResource",
                // this product will be inject into the productDetailCtrl
                product: function (productResource, $stateParams) {
                    var productId = $stateParams.productId;
                    return productResource.get({ productId: productId }).$promise;
                }
            }
        });
}]);