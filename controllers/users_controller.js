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
		function LoadModules(){
			var successLoad = function(response){
				$scope.Modules = response.data;
			};
			var errorLoad = function(response){
				
			};
			api.GET('modules',successLoad,errorLoad);
		};
		$scope.init = function(){
			$scope.Users = [];
			LoadUsers();
			$scope.Modules = [];
			LoadModules();
		};
		$scope.SetActiveUser = function(user){
			$scope.activeUser = user;
		};
		$scope.OpenModal = function(){
			var b = null;
			var config = {
				templateUrl:"ModalContent.html",
				controller:"ModalController",
				resolve:{
					Bitch:function(){
						return b;
					}
				}
			};
			var modal = $uibModal.open(config);
			var promise = modal.result;
			var callback = function(data){
								//console.log(data);
								//$scope.activeItem = data;
								$scope.Message = 'Modal closed';
								LoadUsers();
							};
			var fallback = function(data){
								$scope.Message = 'Modal dismissed';
							};
			promise.then(callback,fallback);
		};
	}]);
	app.register.controller('ModalController',['$scope','$uibModalInstance','api','Bitch',function($scope,$uibModalInstance,api,Bitch){
		$scope.closeModal = function(){
			$uibModalInstance.dismiss();
		};
		$scope.confirmModal = function(){
			var data = {last_name:$scope.TAUser,action:"register"};
			var successConfirm = function(response){
				$uibModalInstance.close(response.data);
			};
			var errorConfirm = function(response){
				
			};
			api.POST('users',data,successConfirm,errorConfirm);
		};
	}]);
});