/**
 * Created by Hung on 5/1/16.
 */
app.controller('productEditCtrl', ['$scope', 'product', function ($scope, product) {

    $scope.product = product;
    if (product && product.productId) {
        $scope.title = "Edit: " + product.productName;
    } else {
        $scope.title = " Add new Product";
    }

}]);