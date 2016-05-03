/**
 * Created by Hung on 4/26/16.
 */
app.controller('productListCtrl', ['$scope', 'productResource', function ($scope, productResource) {

    productResource.query(function (data) {
        $scope.products = data;
    });

    $scope.hideImage = false;

    $scope.toggleImage = function () {
        return $scope.hideImage = !$scope.hideImage;
    }
}]);