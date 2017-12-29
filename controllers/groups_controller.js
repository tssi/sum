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
			if (am){
				for (var j in $scope.Modules){
					var m = $scope.Modules[j];
					if (am.indexOf(m.id) != -1){
						$scope.activeModules.push(m);
					}
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
			if (!mode){
				mode = 'add';
			}
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
					Mode:function(){
						return mode;
					}
				}
			};
			var modal = $uibModal.open(config);
			var promise = modal.result;
			var callback = function(data){
								$scope.activeGroup = data;
								$scope.Message = 'Modal closed';
								LoadGroups();
								LoadActiveModules();
							};
			var fallback = function(data){
								$scope.Message = 'Modal dismissed';
							};
			promise.then(callback,fallback);
		};
	}]);
	app.register.controller('ModalController',['$scope','$uibModalInstance','api','ActiveGroup','Modules','Mode',function($scope,$uibModalInstance,api,ActiveGroup,Modules,Mode){
		$scope.Mode = Mode;
		$scope.ggg = [];
		$scope.ActiveGroup = ActiveGroup;
		$scope.Modules = Modules;
		function LoadActiveModules(){
			$scope.activeModules = [];
			for (var j in $scope.Modules){
				if ($scope.ActiveGroup.modules.indexOf($scope.Modules[j].id) != -1){
					$scope.activeModules.push($scope.Modules[j]);
				}
			}
		};
		function LoadActiveModuless(){
			$scope.activeModules = [];
			for (var i in $scope.Modules){
				if ($scope.ggg.indexOf($scope.Modules[i].id) != -1){
					$scope.activeModules.push($scope.Modules[i]);
				}
			}
		};
		if ($scope.Mode == 'edit'){
			LoadActiveModules();
		}
		$scope.addModule = function(){
			var a = $scope.Tom;
			a = parseInt(a);
			if ($scope.Mode == 'edit'){
				$scope.ActiveGroup.modules.push(a)
				LoadActiveModules();
			}
			else if ($scope.Mode == 'add'){
				$scope.ggg.push(a);
				LoadActiveModuless();
			}
		};
		$scope.removeModule = function(index){
			if ($scope.Mode == 'edit'){
				$scope.ActiveGroup.modules.splice(index,1);
				LoadActiveModules();
			}
			else if ($scope.Mode == 'add'){
				$scope.ggg.splice(index,1);
				LoadActiveModuless();
			}
		};
		$scope.closeModal = function(){
			$uibModalInstance.dismiss();
		};
		$scope.confirmModal = function(){
			if ($scope.Mode == 'add'){
				$scope.ActiveGroup.modules = $scope.ggg;
			}
			var data = $scope.ActiveGroup;
			console.log(data);
			var success = function(response){
				$uibModalInstance.close(response.data);
			};
			var error = function(response){
				
			};
			api.POST('groups',data,success,error);
		};
		
		
		
		
		
		
		
		
		
		
		
		/*$scope.confirmModal = function(){
			var data = $scope.ActiveGroup;
			api.POST('groups',data,function success(response){
				$uibModalInstance.close(response.data);
			});
		};*/
	}]);
});