inDaStriit.controller('ServicesFinderCtrl', function($scope, $http, $document, leafletData, GeoJSONFactory, $mdDialog) 
{
	$scope.$on("getServicesProviders", function(event, args){
		GeoJSONFactory.applyGeoJSON("services", function (feature, layer) {
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
        })
	})
});