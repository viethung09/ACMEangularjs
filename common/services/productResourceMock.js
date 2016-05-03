/**
 * Created by Hung on 4/27/16.
 */
var app = angular.module("productResourceMock", ["ngMockE2E"]);

app.run(function ($httpBackend) {
    // fake model
    var products = [
        {
            "productId": 0,
            "productName": "Leaf Rake",
            "productCode": "GDN-0011",
            "releaseDate": "March 19, 2009",
            "description": "Leaf rake with 48-inch handle.",
            "cost": 9.00,
            "price": 19.95,
            "category": "garden",
            "tags": [ "leaf", "tool" ],
            "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
        },
        {
            "productId": 1,
            "productName": "Hammer",
            "productCode": "TBX-0048",
            "releaseDate": "May 21, 2013",
            "description": "Curved claw steel hammer",
            "cost": 1.00,
            "price": 8.99,
            "category": "toolbox",
            "tags": ["tool"],
            "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
        },
        {
            "productId": 2,
            "productName": "Hp Probook",
            "productCode": "TBX-0048",
            "releaseDate": "May 21, 2011",
            "description": "Export From China",
            "cost": 1.00,
            "price": 666.99,
            "category": "Laptop",
            "tags": ["laptop"],
            "imageUrl": "https://openclipart.org/image/300px/svg_to_png/27651/Minduka-A-gray-laptop-1.png"
        },
        {
            "productId": 3,
            "productName": "Beverage Glass ",
            "productCode": "TBX-0048",
            "releaseDate": "May 21, 2013",
            "description": "Curved claw steel hammer",
            "cost": 1.00,
            "price": 3.99,
            "category": "toolbox",
            "tags": ['drinkware' , 'glass' , 'glasses' , 'photorealistic' , 'tumbler' , 'wikimedia commons'],
            "imageUrl": "https://openclipart.org/image/300px/svg_to_png/13842/Willscrlt-Beverage-Glass-Tumbler.png"
        },
        {
            "productId": 4,
            "productName": "Girls Baby Bottle",
            "productCode": "TBX-0048",
            "releaseDate": "May 21, 2013",
            "description": "Pixabay.",
            "cost": 1.00,
            "price": 4.99,
            "category": "baby",
            "tags": ["tool", "baby", "bottle"],
            "imageUrl": "https://openclipart.org/image/300px/svg_to_png/227104/Girls-Baby-Bottle.png"
        },
        {
            "productId": 5,
            "productName": "Zippo",
            "productCode": "TBX-0048",
            "releaseDate": "May 21, 2013",
            "description": "Pixabay.",
            "cost": 1.00,
            "price": 4.99,
            "category": "tool",
            "tags": ["tool", 'gasoline' , 'lighter' , 'photorealistic' , 'zippo'],
            "imageUrl": "https://openclipart.org/image/300px/svg_to_png/4117/webmichl-zippo.png"
        }
    ];

    var productUrl = "/api/products";
    // get all fake products
    $httpBackend.whenGET(productUrl).respond(products);

    // get a specific product by id
    var urlRegex = new RegExp(productUrl + '/[0-9][0-9]*', ''); // \/api\/products\/[0-9][0-9]*

    $httpBackend.whenGET(urlRegex).respond(function (method, url, data, headers, params) {
        var product = {"productId": 0};
        var parameters = url.split('/'); // return array with first element is empty string
        var length = parameters.length;
        var id = parameters[length - 1];

        if ( id > 0 ) {
            for (var i = 1; i < products.length; i ++) {
                if ( products[i].productId == id) {
                    product = products[i];
                    break;
                }
            }

            return [200, product, {}];
        } else {
            return [ 404, {} ];
        }

    });

    $httpBackend.whenPOST(urlRegex).respond(function (method, url, data, headers, params) {
        var product = angular.fromJson(data);

        if (!product.productId) {
            // new product
            product.productId = products[products.length -1].productId + 1;
            products.push(product);
        } else {
            // update product
            for( var i = 0; i < products.length; i++ ) {
                if ( products[i].productId == product.productId ) {
                    products[i] = product;
                    break;
                }
            }
        }

        return [ 200, product, {}];
    });

    // pass through any request for application files
    $httpBackend.whenGET(/app/).passThrough();
});














