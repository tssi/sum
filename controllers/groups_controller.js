define(['app','api'],function(app){
	app.register.controller('GroupsController',['$scope','api','$uibModal',function($scope,api,$uibModal){
		function LoadGroups(){
			var successLoad = function(response){
				$scope.Groups = response.data;
			};
			var errorLoad = function(response){
			};
			api.GET('groups',successLoad,errorLoad);
		};
		function LoadModules(){
			var successLoad = function(response){
				$scope.Modules = response.data;
			};
			var errorLoad = function(response){
			};
			api.GET('modules',successLoad,errorLoad);
		};
		function LoadActiveModules(){
			$scope.activeModules = [];
			var am = $scope.activeGroup.modules;
			for(var j in $scope.Modules){
				var m = $scope.Modules[j];
				if(am.indexOf(m.id) != -1){
					$scope.activeModules.push(m);
				}
			}
		};
		$scope.init = function(){
			$scope.Groups = [];
			$scope.Modules = [];
			LoadGroups();
			LoadModules();
		};
		$scope.SetActiveGroup = function(group){
			$scope.activeGroup = group;
			LoadActiveModules();
		};
		$scope.removeGroupInfo = function(){
			$scope.activeGroup = null;
		};
		$scope.OpenModal = function(group,mode){
			var group;
			var modules = $scope.activeModules;
			//console.log(group);
			//console.log(mode);
			var config = {
				templateUrl:"ModalContent.html",
				controller:"ModalController",
				resolve:{
					Group:function(){
						return group;
					},
					Modules:function(){
						return modules;
					},
					Mode:function(){
						return mode;
					}
				}
			};
			var modal = $uibModal.open(config);
			var promise = modal.result;
			var callback = function(data){
								$scope.Message = 'Modal closed';
							};
			var fallback = function(data){
								$scope.Message = 'Modal dismissed';
							};
			promise.then(callback,fallback);
		};
	}]);
	app.register.controller('ModalController',['$scope','$uibModalInstance','api','Group','Modules','Mode',function($scope,$uibModalInstance,api,Group,Modules,Mode){
		console.log(Mode);
		$scope.Group = Group;
		if (Mode == 'edit'){
			$scope.activeModules = Modules;
		}
		$scope.closeModal = function(){
			$uibModalInstance.dismiss();
		};
		$scope.confirmModal = function(){
			var success = function(response){
				
			};
			var error = function(response){
				
			};
			api.POST('groups',success,error);
		};
	}]);
});