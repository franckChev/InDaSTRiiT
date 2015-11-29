inDaStriit.controller('MapCtrl', ["$scope", "$http", "leafletData", "$mdDialog", "ScoringFactory", "$rootScope", "GeoJSONFactory", function ($scope, $http, leafletData, $mdDialog, ScoringFactory, $rootScope, GeoJSONFactory) {
    /* Map Init */
    var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    $scope.neighborhood = ScoringFactory.initScore;

    $scope.positionChoice = "position1";
    //services
    $scope.$watch("serchServiceProvider", function (newValue, oldValue) {
        if (newValue !== oldValue && $scope.layers !== undefined) {
            console.log($scope.layers.overlays);
            $scope.layers.overlays.services.visible = newValue;
        }
    });

    $scope.$watch("positionChoice", function (newValue, oldValue) {
        if (newValue !== oldValue) {
            console.log("NewValue>", newValue);
        }
    });

    $scope.user =
    {
        "type": "Feature",
        "properties": {
            "name": "Bob",
            "mail": "bob@instriit.com",
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
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                2.392937,
                48.813948
            ]
        }
    };

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

    //add service
    $scope.addServiceProvider = function()
    {
        //bring popup form
        $scope.current = $scope.user.properties;
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            templateUrl: 'partials/newServicePopup.html',
            controller: function DialogController($scope, $mdDialog) {
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                };
                $scope.newServiceForm = function(){
                    if ($scope.new && $scope.new.service && $scope.new.phone)
                    {
                        var newService =
                        {  
                            "type": "Feature",
                            "properties": {
                              "name": $scope.user.name,
                              "service": $scope.new.service,
                              "contact": [{
                                "phone": $scope.new.phone,
                                "mail": $scope.user.mail
                              }]
                            },
                            "geometry": {
                              "type": "Point",
                              "coordinates": [
                                $scope.myPosition.lng,
                                $scope.myPosition.lat
                              ]
                            }
                        }
                        console.log("new", newService);
                        $scope.closeDialog();
                    }
                    
                };
            }
        });
    };
    

    var options = {};
    options.icon = "people";
    options.markerColor = "red";
    options.onEachFeature = function (feature, layer) {
        $scope[feature.properties.name] = feature.properties;
        var url = 'partials/profilePopup.html';
        if (feature.properties.service)
            var url = 'partials/servicePopup.html'
        layer.on("click", function (e) {
            $scope.current = $scope[e.target.feature.properties.name];
            $mdDialog.show({
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                templateUrl: url,
                controller: function DialogController($scope, $mdDialog) {
                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    }
                }
            });
        });
    };
    options.visible = false;
    GeoJSONFactory.applyGeoJSONFromFile("services", options).then(function (layer) {
        angular.extend($scope.layers.overlays, {services: layer});
    });
    profilesOptions = angular.copy(options);
    profilesOptions.onEachFeature = function (feature, layer) {
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
    profilesOptions.visible = true;
    profilesOptions.icon = "face";
    profilesOptions.markerColor = "pink";
    GeoJSONFactory.applyGeoJSONFromFile("profiles", profilesOptions).then(function (layer) {
        angular.extend($scope.layers.overlays, {profiles: layer});
    });
    myUserOptions = angular.copy(options);
    myUserOptions.onEachFeature = function (feature, layer) {
        layer.bindPopup("Moi");
    };
    myUserOptions.visible = true;
    myUserOptions.icon = "person";
    myUserOptions.markerColor = "blue";
    var layer = GeoJSONFactory.applyGeoJSONFromLocalVariable($scope.user, myUserOptions);
    angular.extend($scope.layers.overlays, {myUser: layer});


    var circle = L.circle([$scope.myPosition.lat, $scope.myPosition.lng], 100);
    leafletData.getMap().then(function (map) {
        map.addLayer(circle);
    });

    //get score
    var score = ScoringFactory.computeScore($scope.user, $scope, function (score) {
        if (score > 4) {
            console.log("Create Notification");
            $rootScope.$broadcast("createNotification", {message: "Ce quartier peut vous intéresser !"});
        }
        console.log("score", score);
    });
    $http.get('http://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"](around:1000,' + $scope.myPosition.lat + ',' + $scope.myPosition.lng + ');way["amenity"](around:1000,48.8131354,2.393143);relation["amenity"](around:1000,48.8131354,2.393143););out body;>;out skel qt;').success(function (result) {
        var data = osmtogeojson(result);
        for (item in data.features) {
            if (data.features[item].properties !== undefined) {
                var tags = data.features[item].properties.tags;
                for (category in $scope.scoring) {
                    if ($scope.scoring[category].amenities.indexOf(tags.amenity) !== -1)
                        $scope.scoring[category].score++;
                }

            }
        }

    });
}]);