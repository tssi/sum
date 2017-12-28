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
		$scope.OpenModal = function(activegroup,mode){
			$scope.Mode = mode;
			var modules = $scope.Modules;
			var activemodules = $scope.activeModules;
			var config = {
				templateUrl:"ModalContent.html",
				controller:"ModalController",
				resolve:{
					ActiveGroup:function(){
						return activegroup;
					},
					Modules:function(){
						return modules;
					},
					ActiveModules:function(){
						return activemodules;
					},
					Mode:function(){
						return mode;
					}
				}
			};
			var modal = $uibModal.open(config);
			var promise = modal.result;
			var callback = function(data){
								//console.log(data);
								$scope.Message = 'Modal closed';
								LoadGroups();
							};
			var fallback = function(data){
								$scope.Message = 'Modal dismissed';
							};
			promise.then(callback,fallback);
		};
	}]);
	app.register.controller('ModalController',['$scope','$uibModalInstance','api','ActiveGroup','Modules','ActiveModules','Mode',function($scope,$uibModalInstance,api,ActiveGroup,Modules,ActiveModules,Mode){
		$scope.Mode = Mode;
		$scope.ActiveGroup = ActiveGroup;
		//$scope.activeModules = ActiveModules;
		//console.log($scope.ActiveGroup.modules);
		$scope.Modules = Modules;
		function LoadActiveModules(){
			$scope.activeModules = [];
			var am = $scope.ActiveGroup.modules;
			for(var j in $scope.Modules){
				var m = $scope.Modules[j];
				if(am.indexOf(m.id) != -1){
					$scope.activeModules.push(m);
				}
			}
		};
		LoadActiveModules();
		$scope.closeModal = function(){
			$uibModalInstance.dismiss();
		};
		$scope.addModule = function(){
			var a = $scope.Tom
			a = parseInt(a);
			$scope.ActiveGroup.modules.push(a);
			LoadActiveModules();
		};
		$scope.confirmModal = function(){
			var data = $scope.ActiveGroup;
			api.POST('groups',data,function success(response){
				$uibModalInstance.close(response.data);
			});
		};
	}]);
});