inDaStriit.controller('NotificationsCtrl', function($scope, $mdToast, $document) 
{
	
	// function lol(message)
	// {
	var last = {
		bottom: false,
		top: true,
		left: false,
		right: true
	};

	$scope.toastPosition = angular.extend({},last);

	$scope.getToastPosition = function() {
		sanitizePosition();
		return Object.keys($scope.toastPosition)
		.filter(function(pos) { return $scope.toastPosition[pos]; })
		.join(' ');
	};
	$scope.showSimpleToast = function(message) {
		var toast = $mdToast.simple();
		toast.content(message);
		toast.theme("coffe-toast");
		toast.position("top right");
		toast.hideDelay(3000);
		$mdToast.show(toast);   
	};

	$scope.$on("createNotification", function(event, args)
	{
		console.log("Wahouuu");
		$scope.showSimpleToast(args.message);
	});



// }
})
	.controller('ToastCtrl', function($scope, $mdToast) {
		$scope.closeToast = function() {
			$mdToast.hide();
		};
	});