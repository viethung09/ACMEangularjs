/**
 * Created by Hung on 4/27/16.
 */
commonServices.factory("productResource", ['$resource', productResource]);

function productResource($resource) {
    return $resource("/api/products/:productId");
}