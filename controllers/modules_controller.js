define(['app','api'],function(app){
	app.register.controller('ModulesController',['$scope','api','$uibModal',function($scope,api,$uibModal){
		function getModules(data){
			$scope.DataLoading = true;
			var success = function(response){
				$scope.Modules = response.data;
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
			api.GET('modules',data,success,error);
		};
		function getGroups(){
			var success = function(response){
				$scope.Groups = response.data;
			};
			var error = function(response){
			};
			api.GET('groups',success,error);
		};
		function getRevokedGranted(){
			$scope.Revoked = [];
			$scope.Granted = [];
			for (var i in $scope.Groups){
				var group = $scope.Groups[i];
				if ($scope.activeModule.revoked.indexOf(group.id) != -1){
					var activeModule = [];
					activeModule.id = $scope.activeModule.id;
					activeModule.group_id = group.id;
					$scope.Revoked.push(activeModule);
				}
				if ($scope.activeModule.granted.indexOf(group.id) != -1){
					var activeModule = [];
					activeModule.id = $scope.activeModule.id;
					activeModule.group_id = group.id;
					$scope.Granted.push(activeModule);
				}
			}
		};
		$scope.init = function(){
			$scope.Modules = [];
			$scope.Groups = [];
			$scope.ActivePage = 1;
			$scope.NextPage = null;
			$scope.PrevPage = null;
			$scope.DataLoading = false;
			getGroups();
			getModules({page:$scope.ActivePage});
		};
		$scope.navigatePage = function(page){
			$scope.ActivePage = page;
			getModules({page:$scope.ActivePage});
		};
		$scope.SetActiveModule = function(module){
			$scope.activeModule = module;
			getRevokedGranted();
		};
		$scope.filterModule = function(module){
			var searchBox = $scope.SearchModule;
			var keyword = new RegExp(searchBox,'i');
			var test = keyword.test(module.name);
			return !searchBox || test;
		};
		$scope.confirmSearch = function(){
			getModules({page:1,keyword:$scope.SearchModule,fields:['name']});
		}
		$scope.clearSearch = function(){
			$scope.SearchModule = "";
			getModules({page:1});
		};
		$scope.revoke = function(index){
			data = $scope.Granted[index];
			data.action = "revoke";
			var success = function(response){
				getModules();
				$scope.activeModule = response.data;
				getRevokedGranted();
			};
			var error = function(response){
				
			};
			api.POST('modules',data,success,error);
		};
		$scope.grant = function(index){
			data = $scope.Revoked[index];
			data.action = "grant";
			var success = function(response){
				getModules();
				$scope.activeModule = response.data;
				getRevokedGranted();
			};
			var error = function(response){
				
			};
			api.POST('modules',data,success,error);
		};
		$scope.removeModuleInfo = function(){
			$scope.activeModule = null;
			$scope.Revoked = [];
			$scope.Granted = [];
		};
		$scope.OpenModal = function(activemodule,mode){
			if (!mode){
				mode = "add";
				$scope.Mode = mode;
			}
			$scope.Mode = mode;
			var config = {
				templateUrl:"ModalContent.html",
				controller:"ModuleModalController",
				resolve:{
					ActiveModule:function(){
						return activemodule;
					},
					Mode:function(){
						return mode;
					}
				}
			};
			var modal = $uibModal.open(config);
			var promise = modal.result;
			var callback = function(data){
				getModules();
				$scope.activeModule = data;
				getRevokedGranted();
			};
			var fallback = function(data){
			};
			promise.then(callback,fallback);
		};
	}]);
	app.register.controller('ModuleModalController',['$scope','$uibModalInstance','api','ActiveModule','Mode',function($scope,$uibModalInstance,api,ActiveModule,Mode){
		$scope.ActiveModule = ActiveModule;
		$scope.closeModal = function(){
			$uibModalInstance.dismiss();
		};
		$scope.confirmModal = function(){
			var data = $scope.ActiveModule;
			switch (Mode){
				case "add":
					data.action = "register";
				break;
				case "edit":
					data.action = "edit";
				break;
			}
			var success = function(response){
				$uibModalInstance.close(response.data);
			};
			var error = function(response){
				
			};
			api.POST('modules',data,success,error);
		};
	}]);
});