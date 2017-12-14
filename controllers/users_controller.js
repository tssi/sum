define(['app','api'],function(app){
	app.register.controller('UserController',['$scope','api','$uibModal',function($scope,api,$uibModal){
		function LoadUsers(){
			var successLoad = function(response){
				$scope.Users = response.data;
			};
			var errorLoad = function(response){
				
			};
			api.GET('users',successLoad,errorLoad);
		};
		$scope.init = function(){
			$scope.Users = [];
			LoadUsers();
		};
		$scope.SetActiveUser = function(user){
				console.log(user);
			$scope.activeUser = user;
		};
		$scope.OpenModal = function(){
			var config = {
				templateUrl:"ModalContent.html",
				controller:"ModalController"
			};
			var modal = $uibModal.open(config);
			var promise = modal.result;
			var callback = function(data){
								//$scope.activeItem = data;
								$scope.Message = 'Modal closed';
								//LoadItems();
							};
			var fallback = function(data){
								$scope.Message = 'Modal dismissed';
							};
			promise.then(callback,fallback);
		};
	}]);
	app.register.controller('ModalController',['$scope','$uibModalInstance','api',function($scope,$uibModalInstance,api){
		$scope.closeModal = function(){
			$uibModalInstance.dismiss();
		};
		$scope.confirmModal = function(){
			$uibModalInstance.close();
		};
	}]);
});