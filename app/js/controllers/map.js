inDaStriit.controller('MapCtrl', ["$scope", "$http", "leafletData", "$mdDialog", "GeoJSONFactory", "my_widget", function ($scope, $http, leafletData, $mdDialog, GeoJSONFactory, my_widget) {
    /* Map Init */
    var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    $scope.quartier = my_widget.initScore;

    // my_widget.getUserScore(function(userScore)
    // {
    //     $scope.user = userScore;
    //     console.log($scope.user);
    // })

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
    //get score of neighboorhood
    my_widget.completeScore($scope);
    /* Retrieve profiles */
    GeoJSONFactory.applyGeoJSON("profiles", function (feature, layer) {
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
    });

    
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

}]);