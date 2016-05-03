/**
 * Created by Hung on 4/30/16.
 */
app.controller('productDetailCtrl', ['$scope', 'product', function ($scope, product) {

    $scope.product = product;
    console.log($scope.product);
    $scope.title = "Product Detail: " + $scope.product.productName;

    if ($scope.product.tags) {
        $scope.product.tagList = $scope.product.tags.toString();
    }


}]);