inDaStriit.controller('NotificationsCtrl', function($scope, $mdToast, $document) 
{
<<<<<<< HEAD

=======
	
	// function lol(message)
	// {
>>>>>>> 3407a12bed1045122d8e50ad71db109867a1d1e3
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
<<<<<<< HEAD

	$scope.showSimpleToast = function() {
=======
	$scope.showSimpleToast = function(message) {
>>>>>>> 3407a12bed1045122d8e50ad71db109867a1d1e3
		var toast = $mdToast.simple();
		toast.content(message);
		toast.theme("coffe-toast");
		toast.position("top right");
		toast.hideDelay(3000);
		$mdToast.show(toast);   
	};
<<<<<<< HEAD
=======

	$scope.$on("createNotification", function(event, args)
	{
		console.log("Wahouuu");
		$scope.showSimpleToast(args.message);
	});



// }
>>>>>>> 3407a12bed1045122d8e50ad71db109867a1d1e3
})
	.controller('ToastCtrl', function($scope, $mdToast) {
		$scope.closeToast = function() {
			$mdToast.hide();
		};
	}); 