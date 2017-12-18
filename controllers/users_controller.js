define(['app','api'],function(app){
	app.register.controller('UserController',['$scope','api','$uibModal',function($scope,api,$uibModal){
		function LoadUsers(){
			var successLoad = function(response){
				$scope.Users = response.data;
			};
			var errorLoad = function(response){
			};
			var data = {status:"ACTIVE"}; 
			api.GET('users',data,successLoad,errorLoad);
		};
		function LoadModules(){
			var successLoad = function(response){
				$scope.Modules = response.data;
			};
			var errorLoad = function(response){
			};
			api.GET('modules',successLoad,errorLoad);
		};
		/*function LoadGroups(){
			var successLoad = function(response){
				$scope.Groups = response.data;
			};
			var errorLoad = function(response){
			};
			api.GET('groups',successLoad,errorLoad);
		};*/
		$scope.init = function(){
			$scope.Users = [];
			$scope.Modules = [];
			//$scope.Groups = [];
			LoadUsers();
			LoadModules();
			//LoadGroups();
		};
		$scope.SetActiveUser = function(user){
			$scope.activeUser = user;
		};
		$scope.removeUserInfo = function(){
			$scope.activeUser = null;
		};
		$scope.OpenModal = function(){
			var user = null;
			var config = {
				templateUrl:"ModalContent.html",
				controller:"ModalController",
				resolve:{
					Users:function(){
						return user;
					}
				}
			};
			var modal = $uibModal.open(config);
			var promise = modal.result;
			var callback = function(data){
								$scope.activeUser = data;
								$scope.Message = 'Modal closed';
								LoadUsers();
							};
			var fallback = function(data){
								$scope.Message = 'Modal dismissed';
							};
			promise.then(callback,fallback);
		};
	}]);
	app.register.controller('ModalController',['$scope','$uibModalInstance','api',function($scope,$uibModalInstance,api){
		function LoadGroups(){
			var successLoad = function(response){
				$scope.Groups = response.data;
			};
			var errorLoad = function(response){
			};
			api.GET('groups',successLoad,errorLoad);
		};
		$scope.Groups = [];
		LoadGroups();
		$scope.closeModal = function(){
			$uibModalInstance.dismiss();
		};
		$scope.confirmModal = function(){
			var data = 	{
							action:"register",
							last_name:$scope.lastName,
							first_name:$scope.firstName,
							middle_initial:$scope.middleInitial,
							username:$scope.userName,
							group_id:$scope.group,
							password:$scope.password
						};
			var successConfirm = function(response){
				$uibModalInstance.close(response.data);
			};
			var errorConfirm = function(response){
				
			};
			api.POST('users',data,successConfirm,errorConfirm);
		};
	}]);
});