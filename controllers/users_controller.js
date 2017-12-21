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
		function LoadGroups(){
			var successLoad = function(response){
				$scope.Groups = response.data;
			};
			var errorLoad = function(response){
			};
			api.GET('groups',successLoad,errorLoad);
		};
		function Kembi(){
			$scope.activeGroup = null;
			$scope.activeModules = [];
			for(var i in $scope.Groups){
				var group = $scope.Groups[i];
				if($scope.activeUser.group_id == group.id){
					$scope.activeGroup = group;
				}
			}
			var am = $scope.activeGroup.modules;
			for(var j in $scope.Modules){
				var m = $scope.Modules[j];
				if(am.indexOf(m.id) != -1){
					$scope.activeModules.push(m);
				}
			}
		};
		$scope.init = function(){
			$scope.Users = [];
			$scope.Modules = [];
			$scope.Groups = [];
			$scope.activeGroup = null;
			$scope.activeUser = null;
			LoadUsers();
			LoadModules();
			LoadGroups();
		};
		$scope.SetActiveUser = function(user){
			$scope.activeUser = user;
			Kembi();
		};
		$scope.removeUserInfo = function(){
			$scope.activeUser = null;
		};
		$scope.OpenModal = function(user,mode){
			var group = $scope.Groups;
			var config = {
				templateUrl:"ModalContent.html",
				controller:"ModalController",
				resolve:{
					User:function(){
						return user;
					},
					Groups:function(){
						return group;
					},
					Mode:function(){
						return mode;
					}
				}
			};
			var modal = $uibModal.open(config);
			var promise = modal.result;
			var callback = function(data){
								$scope.activeUser = data;
								$scope.Message = 'Modal closed';
								LoadUsers();
								Kembi();
							};
			var fallback = function(data){
								$scope.Message = 'Modal dismissed';
							};
			promise.then(callback,fallback);
		};
	}]);
	app.register.controller('ModalController',['$scope','$uibModalInstance','api','Groups','User','Mode',function($scope,$uibModalInstance,api,Groups,User,Mode){
		$scope.Groups = Groups;
		$scope.User = User;
		console.log(Groups);
		$scope.closeModal = function(){
			$uibModalInstance.dismiss();
		};
		$scope.confirmModal = function(){
			var data = $scope.User;
			data.action = "edit";
			var successConfirm = function(response){
				$uibModalInstance.close(response.data);
			};
			var errorConfirm = function(response){
				
			};
			api.POST('users',data,successConfirm,errorConfirm);
		};
	}]);
});