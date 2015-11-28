inDaStriit.controller('ServicesFinderCtrl', function ($scope, $http, $document, leafletData, GeoJSONFactory, $mdDialog) {
    var options = {};
    options.onEachFeature = function (feature, layer) {
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
    options.pointToLayer = function (feature, latlng)
    {
        var redMarker = L.AwesomeMarkers.icon({
            icon: 'cogs',
            markerColor: 'red',
            prefix : 'fa'
        });
        console.log(latlng);
        var marker = L.marker([latlng.lat, latlng.lng], {icon: redMarker});
        return marker;
    };
    $scope.$on("getServicesProviders", function (event, args) {
        GeoJSONFactory.applyGeoJSON("services", options, $scope);
    });
});