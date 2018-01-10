define(['app','api'],function(app){
	app.register.controller('GroupsController',['$scope','api','$uibModal',function($scope,api,$uibModal){
		function LoadGroups(data){
			$scope.DataLoading = true;
			var success = function(response){
				$scope.Groups = response.data;
				$scope.NextPage = response.meta.next;
				$scope.PrevPage = response.meta.prev;
				$scope.TotalItems = response.meta.count;
				$scope.LastItem = response.meta.page * response.meta.limit;
				$scope.FirstItem = $scope.LastItem - (response.meta.limit - 1);
				if ($scope.LastItem > $scope.TotalItems){
					$scope.LastItem = $scope.TotalItems;
				};
				$scope.DataLoading = false;	
			};
			var error = function(response){
			};
			api.GET('groups',data,success,error);
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
			$scope.ActivePage = 1;
			$scope.NextPage = null;
			$scope.PrevPage = null;
			LoadGroups({page:$scope.ActivePage});
			LoadModules();
		};
		$scope.navigatePage = function(page){
			console.log(page);
			$scope.ActivePage = page;
			LoadGroups({page:$scope.ActivePage});
		};
		$scope.SetActiveGroup = function(group){
			$scope.activeGroup = group;
			LoadActiveModules();
		};
		$scope.clearSearch = function(){
			$scope.SearchGroup = "";
		};
		$scope.removeGroupInfo = function(){
			$scope.activeGroup = null;
		};
		$scope.OpenModal = function(activegroup,mode){
			if (!mode){
			mode = "add";
			}
			$scope.Mode = mode;
			var modules = $scope.Modules;
			var activemodules = $scope.activeModules;
			var config = {
				templateUrl:"ModalContent.html",
				controller:"GroupModalController",
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
								LoadGroups();
								LoadActiveModules();
							};
			var fallback = function(data){
							};
			promise.then(callback,fallback);
		};
	}]);
	app.register.controller('GroupModalController',['$scope','$uibModalInstance','api','ActiveGroup','Modules','Mode',function($scope,$uibModalInstance,api,ActiveGroup,Modules,Mode){
		$scope.Mode = Mode;
		$scope.modalModules = [];
		$scope.activeModules = [];
		$scope.ActiveGroup = angular.copy(ActiveGroup);
		$scope.Modules = angular.copy(Modules);
		function LoadActiveModules(){
			$scope.activeModules = [];
			for (var j in $scope.Modules){
				//if ($scope.Mode == 'edit'){
				$scope.modalModules = $scope.ActiveGroup.modules;
				//}
				if ($scope.modalModules.indexOf($scope.Modules[j].id) != -1){
					$scope.activeModules.push($scope.Modules[j]);
				}
			}
		};
		if ($scope.Mode == "edit"){
			LoadActiveModules();
		}
		$scope.addModule = function(){
			if ($scope.Mod){
				var module = $scope.Mod;
				var module_id = parseInt(module.id);
				$scope.modalModules.push(module_id);
				$scope.activeModules.push(module);
			}
		};
		$scope.removeModule = function(index){
			$scope.modalModules.splice(index,1);
			LoadActiveModules();
		};
		$scope.closeModal = function(){
			$uibModalInstance.dismiss();
		};
		$scope.confirmModal = function(){
			if ($scope.Mode == "add"){
				$scope.ActiveGroup.modules = $scope.modalModules;
				var data = $scope.ActiveGroup;
				data.action = "add";
			}
			else if ($scope.Mode == "edit"){
				var data = $scope.ActiveGroup;
				data.action = "edit";
			}
			//console.log(data);
			var success = function(response){
				$uibModalInstance.close(response.data);
			};
			var error = function(response){
				
			};
			api.POST('groups',data,success,error);
		};
	}]);
});
		/*function LoadActiveModules(){
			$scope.activeModules = [];
			for (var j in $scope.Modules){
				if ($scope.Mode == 'edit'){
					if ($scope.ActiveGroup.modules.indexOf($scope.Modules[j].id) != -1){
						$scope.activeModules.push($scope.Modules[j]);
					}
				}
				else if ($scope.Mode == 'add'){
					if ($scope.ggg.indexOf($scope.Modules[j].id) != -1){
						$scope.activeModules.push($scope.Modules[j]);
					}
				}
			}
		};
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
		function LoadGroups(){
			var successLoad = function(response){
				$scope.Groups = response.data;
			};
			var errorLoad = function(response){
			};
			api.GET('groups',successLoad,errorLoad);
		}; */