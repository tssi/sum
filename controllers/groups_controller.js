define(['app','api'],function(app){
	app.register.controller('GroupsController',['$scope','api','$uibModal',function($scope,api,$uibModal){
		function getGroups(data){
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
		function getModules(){
			var successLoad = function(response){
				$scope.Modules = response.data;
			};
			var errorLoad = function(response){
			};
			api.GET('modules',successLoad,errorLoad);
		};
		function getActiveModules(){
			$scope.activeModules = [];
			var am = $scope.activeGroup.modules;
			if (am){
				for (var j in $scope.Modules){
					var module = $scope.Modules[j];
					if (am.indexOf(module.id) != -1){
						$scope.activeModules.push(module);
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
			getGroups({page:$scope.ActivePage});
			getModules();
		};
		$scope.navigatePage = function(page){
			$scope.ActivePage = page;
			getGroups({page:$scope.ActivePage});
		};
		$scope.SetActiveGroup = function(group){
			$scope.activeGroup = group;
			getActiveModules();
		};
		$scope.filterGroup = function(group){
			var searchBox = $scope.SearchGroup;
			var keyword = new RegExp(searchBox,'i');
			var test = keyword.test(group.id);
			return !searchBox || test;
		};
		$scope.confirmSearch = function(){
			getGroups({page:1,keyword:$scope.SearchGroup,fields:['id']});
		}
		$scope.clearSearch = function(){
			$scope.SearchGroup = "";
			getGroups({page:1});
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
				getGroups();
				getActiveModules();
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
		function getActiveModules(){
			$scope.activeModules = [];
			for (var j in $scope.Modules){
				$scope.modalModules = $scope.ActiveGroup.modules;
				if ($scope.modalModules.indexOf($scope.Modules[j].id) != -1){
					$scope.activeModules.push($scope.Modules[j]);
				}
			}
		};
		if ($scope.Mode == "edit"){
			getActiveModules();
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
			getActiveModules();
		};
		$scope.closeModal = function(){
			$uibModalInstance.dismiss();
		};
		$scope.confirmModal = function(){
			switch ($scope.Mode){
				case "add":
					$scope.ActiveGroup.modules = $scope.modalModules;
					var data = $scope.ActiveGroup;
					data.action = "add";
				break;
				case "edit":
					var data = $scope.ActiveGroup;
					data.action = "edit";
				break;
			}
			var success = function(response){
				$uibModalInstance.close(response.data);
			};
			var error = function(response){
				
			};
			api.POST('groups',data,success,error);
		};
	}]);
});