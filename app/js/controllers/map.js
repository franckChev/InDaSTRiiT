inDaStriit.controller('MapCtrl', ["$scope", "$http", "leafletData", "$mdDialog", "ScoringFactory", "$rootScope", "GeoJSONFactory", function ($scope, $http, leafletData, $mdDialog, ScoringFactory, $rootScope, GeoJSONFactory) {
    /* Map Init */
    var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    $scope.quartier = ScoringFactory.initScore;

    // ScoringFactory.getUserScore(function(userScore)
    // {
    //     $scope.user = userScore;
    //     console.log($scope.user);
    // })

    $scope.$watch("serchServiceProvider", function (newValue, oldValue) {
        if (newValue !== oldValue && $scope.layers !== undefined) {
            console.log($scope.layers.overlays);
            $scope.layers.overlays.services.visible = newValue;
        }
    });


    $scope.user = [
        {
            "type": "Feature",
            "properties": {
                "name": "Bob",
                "offre": 200,
                "demande": 50,
                "age": 18,
                "genre": "h",
                "nbLikes": [{
                    "resto": 2,
                    "bars": 25,
                    "bands": 3,
                    "sports": 48,
                    "films": 0,
                    "books": 78
                }],
                "catSociale": "etudiant",
                "situation": "celibataire",
                "events": [{
                    "concert": 0,
                    "manif": 0,
                    "soiree": 5,
                    "conference": 1,
                    "sport": 14
                }]
            }
        }
    ];

    angular.extend($scope, {
        myPosition: {
            lat: 48.8139878,
            lng: 2.3927642,
            zoom: 17
        },

        layers: {
            baselayers: {
                osm: {
                    name: osmAttrib,
                    url: osmUrl,
                    type: 'xyz'
                },
            },
            overlays: {}

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

    var options = {};
    options.icon = "people";
    options.markerColor = "red";
    options.onEachFeature =function (feature, layer) {
        $scope[feature.properties.name] = feature.properties;
        layer.on("click", function (e) {
            $scope.current = $scope[e.target.feature.properties.name];
            $mdDialog.show({
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                templateUrl: 'partials/profilePopup.html',
                controller: function DialogController($scope, $mdDialog) {
                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    }
                }
            });
        });
    };
    options.visible = false;
    GeoJSONFactory.applyGeoJSON("services", options).then(function (layer) {
        angular.extend($scope.layers.overlays, {services: layer});
    });
    profilesOptions = angular.copy(options);
    profilesOptions.visible = true;
    profilesOptions.icon = "face";
    profilesOptions.markerColor = "pink";
    GeoJSONFactory.applyGeoJSON("profiles", profilesOptions).then(function (layer) {
        angular.extend($scope.layers.overlays, {profiles: layer});
    });


    var circle = L.circle([$scope.myPosition.lat, $scope.myPosition.lng], 100);
    leafletData.getMap().then(function (map) {
        map.addLayer(circle);
    });

//get score
//var score = ScoringFactory.computeScore($scope.user, $scope, function (score) {
//    if (score > 4) {
//        console.log("Create Notification");
//        $rootScope.$broadcast("createNotification", {message: "Ce quartier peut vous intéresser !"});
//        GeoJSONFactory.applyGeoJSON("profiles", function (feature, layer) {
//            $scope[feature.properties.name] = feature.properties;
//            layer.on("click", function (e) {
//                $scope.current = $scope[e.target.feature.properties.name];
//                $mdDialog.show({
//                    clickOutsideToClose: true,
//                    scope: $scope,
//                    preserveScope: true,
//                    templateUrl: 'partials/profilePopup.html',
//                    controller: function DialogController($scope, $mdDialog) {
//                        $scope.closeDialog = function () {
//                            $mdDialog.hide();
//                        }
//                    }
//                });
//            });
//        });
//    }
//
//    console.log("score", score);
//});

    /* Retrieve profiles */


// $http.get('http://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"](around:1000,'+ $scope.myPosition.lat +','+ $scope.myPosition.lng +');way["amenity"](around:1000,48.8131354,2.393143);relation["amenity"](around:1000,48.8131354,2.393143););out body;>;out skel qt;').success(function (result) {
//     var data = osmtogeojson(result);
//     for (item in data.features)
//     {
//             if (data.features[item].properties !== undefined)
//             {
//                 var tags = data.features[item].properties.tags;
//                 for (category in $scope.scoring) {
//                     if ($scope.scoring[category].amenities.indexOf(tags.amenity) !== -1)
//                         $scope.scoring[category].score++;
//                 }

//             }
//     }


    console.log($scope.quartier);
// leafletData.getMap().then(function (map) {
//     console.log(geojson);
//     map.addLayer(geojson);
// });


    /* Retrieve POI */
//GeoJSONFactory.applyGeoJSON("restaurant", function (feature, layer) {
//    $scope.score.restaurant++;
//    layer.bindPopup(feature.properties.name);
//});
    /* GeoJSONFactory.applyGeoJSON("bar", function (feature, layer) {
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
     });*/


    //$http({
    //    method: 'GET',
    //    url: 'data/profiles.json'
    //}).success(function (result) {
    //    var geojson = L.geoJson(result, {
    //        onEachFeature: function (feature, layer) {
    //            layer.bindPopup(feature.properties.name);
    //            layer.on("click", function()
    //            {
    //                alert = $mdDialog.alert({
    //                    title: 'Attention',
    //                    content: 'This is an example of how easy dialogs can be!',
    //                    ok: 'Close'
    //                });
    //                $mdDialog
    //                    .show( alert )
    //                    .finally(function() {
    //                        alert = undefined;
    //                    });
    //            })
    //        }
    //    });
    //    leafletData.getMap().then(function (map) {
    //        map.addLayer(geojson);
    //    });
    //});
}]);