inDaStriit.controller('MapCtrl', ["$scope", "$http", "leafletData", "$mdDialog", "GeoJSONFactory", function ($scope, $http, leafletData, $mdDialog, GeoJSONFactory) {
    /* Map Init */
    var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    $scope.categories = {
        restaurant : {
            score : 0,
            amenities : ["restaurant", "fast_food"],
            shop : [""]
        },
        bar : {
            score : 0,
            amenities : ["bar", "cafe", "pub"],
            shop : ["alcohol", "wine", "beverages"]
        },
        music : {
            score : 0,
            amenities : [""],
            shop : ["music", "musical_instruments"]
        },
        sport : {
            score : 0,
            amenities : ["gym", "" ]
        }

    };
    $scope.score = {
        restaurant: 0,
        bar: 0,
        cinema: 0,
        emergency: 0,
        historic: 0,
        museum: 0,
        shop: 0,
        sport_center: 0
    };
    angular.extend($scope, {
        myPosition: {
            lat: 48.8139878,
            lng: 2.3927642,
            zoom: 17
        },
        tiles: {
            url: osmUrl,
            options: {
                attribution: osmAttrib
            }
        },
        defaults: {
            scrollWheelZoom: false
        },
        events: {
            map: {
                enable: ['drag', 'click'],
                logic: 'emit'
            }
        }

    });
    console.log(leafletData);
    var circle = L.circle([$scope.myPosition.lat, $scope.myPosition.lng], 100);
    leafletData.getMap().then(function (map) {
        map.addLayer(circle);
    });
    /* Retrieve profiles */
    GeoJSONFactory.applyGeoJSON("profiles", function (feature, layer) {
+        $scope[feature.properties.name] = feature.properties;
+        layer.on("click", function (e) {
+            $scope.current = $scope[e.target.feature.properties.name];
+            $mdDialog.show({
+                clickOutsideToClose: true,
+                scope: $scope,
+                preserveScope: true,
+                templateUrl: 'partials/profilePopup.html',
+                controller: function DialogController($scope, $mdDialog) {
+                    $scope.closeDialog = function () {
+                        $mdDialog.hide();
+                    }
+                }
+            });
         });
     });


    $http.get('http://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"](around:1000,48.8131354,2.393143);way["amenity"](around:1000,48.8131354,2.393143);relation["amenity"](around:1000,48.8131354,2.393143););out body;>;out skel qt;').success(function (result) {
        var data = osmtogeojson(result);
        for (item in data.features)
        {
                if (data.features[item].properties !== undefined)
                {
                    var tags = data.features[item].properties.tags;
                    if ($scope.bouffe.indexOf(tags.amenity) !== -1)
                        $scope.score.restaurant++;

                }
        }
            
        
        console.log($scope.score);
        // leafletData.getMap().then(function (map) {
        //     console.log(geojson);
        //     map.addLayer(geojson);
        // });

    });
    /* Retrieve POI */
    //GeoJSONFactory.applyGeoJSON("restaurant", function (feature, layer) {
    //    $scope.score.restaurant++;
    //    layer.bindPopup(feature.properties.name);
    //});
    GeoJSONFactory.applyGeoJSON("bar", function (feature, layer) {
        $scope.score.bar++;
        layer.bindPopup(feature.properties.name);
    });
    GeoJSONFactory.applyGeoJSON("cinema", function (feature, layer) {
        $scope.score.cinema++;
        layer.bindPopup(feature.properties.name);
    });
    GeoJSONFactory.applyGeoJSON("emergency", function (feature, layer) {
        $scope.score.emergency++;
        layer.bindPopup(feature.properties.name);
    });
    GeoJSONFactory.applyGeoJSON("historic", function (feature, layer) {
        $scope.score.historic++;
        layer.bindPopup(feature.properties.name);
    });

}]);