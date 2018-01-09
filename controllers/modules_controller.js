define(['app','api'],function(app){
	app.register.controller('ModulesController',['$scope','api','$uibModal',function($scope,api,$uibModal){
		function LoadModules(){
			var success = function(response){
				$scope.Modules = response.data;
			};
			var error = function(response){
			};
			api.GET('modules',success,error);
		};
		function LoadGroups(){
			var success = function(response){
				$scope.Groups = response.data;
			};
			var error = function(response){
			};
			api.GET('groups',success,error);
		};
		function LoadRsGs(){
			$scope.Rs = [];
			$scope.Gs = [];
			for (var i in $scope.Groups){
				var group = $scope.Groups[i];
				if ($scope.activeModule.revoked.indexOf(group.id) != -1){
							var a = [];
							a.id = $scope.activeModule.id;
							a.group_id = group.id;
							$scope.Rs.push(a);
				}
				if ($scope.activeModule.granted.indexOf(group.id) != -1){
							var a = [];
							a.id = $scope.activeModule.id;
							a.group_id = group.id;
							$scope.Gs.push(a);
				}
				/* for (var j in $scope.activeModule.revoked){
					if ($scope.activeModule.revoked){
						if ($scope.Groups[i].id == $scope.activeModule.revoked[j]){
							var a = [];
							a.id = $scope.activeModule.id;
							a.group_id = $scope.activeModule.revoked[j];
							$scope.Rs.push(a);
						}
					}
				}
				for (var k in $scope.activeModule.granted){
					if ($scope.activeModule.granted){
						if ($scope.Groups[i].id == $scope.activeModule.granted[k]){
							var b = [];
							b.id = $scope.activeModule.id;
							b.group_id = $scope.activeModule.granted[k];
							$scope.Gs.push(b);
						}
					}
				} */
			}
		};
		$scope.init = function(){
			$scope.Modules = [];
			$scope.Groups = [];
			$scope.Message = null;
			LoadModules();
			LoadGroups();
		};
		$scope.navigatePage = function(page){
			$scope.ActivePage = page;
			getModules({page:$scope.ActivePage});
		};
		$scope.SetActiveModule = function(module){
			$scope.activeModule = module;
			LoadRsGs();
		};
		$scope.revoke = function(index){
			data = $scope.Gs[index];
			data.action = "revoke";
			var success = function(response){
				LoadModules();
				$scope.activeModule = response.data;
				LoadRsGs();
			};
			var error = function(response){
				
			};
			api.POST('modules',data,success,error);
		};
		$scope.grant = function(index){
			data = $scope.Rs[index];
			data.action = "grant";
			var success = function(response){
				LoadModules();
				$scope.activeModule = response.data;
				LoadRsGs();
			};
			var error = function(response){
				
			};
			api.POST('modules',data,success,error);
		};
		$scope.removeModuleInfo = function(){
			$scope.activeModule = null;
			$scope.Rs = [];
			$scope.Gs = [];
		};
		$scope.OpenModal = function(activemodule,mode){
			if(!mode){
				mode = "add";
				$scope.Mode = mode;
			}
			$scope.Mode = mode;
			var config = {
				templateUrl:"ModalContent.html",
				controller:"ModalController",
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
								LoadModules();
								$scope.activeModule = data;
								LoadRsGs();
							};
			var fallback = function(data){
							};
			promise.then(callback,fallback);
		};
	}]);
	app.register.controller('ModalController',['$scope','$uibModalInstance','api','ActiveModule','Mode',function($scope,$uibModalInstance,api,ActiveModule,Mode){
		$scope.ActiveModule = ActiveModule;
		$scope.closeModal = function(){
			$uibModalInstance.dismiss();
		};
		$scope.confirmModal = function(){
			var data = $scope.ActiveModule;
			if (Mode == "add"){
				data.action = "register";
			}
			else if (Mode == "edit"){
				data.action = "edit";
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
		/* function Pasa(){
				for (var j in $scope.activeModule.revoked){
					if ($scope.activeModule.revoked){
						if ($scope.Groups[$scope.i].id == $scope.activeModule.revoked[j]){
							var a = [];
							a.id = $scope.activeModule.id;
							a.group_id = $scope.activeModule.revoked[j];
							$scope.Rs.push(a);
						}
					}
				}
		};
		function Load(){
				for (var k in $scope.activeModule.granted){
					if ($scope.activeModule.granted){
						if ($scope.Groups[$scope.i].id == $scope.activeModule.granted[k]){
							var b = [];
							b.id = $scope.activeModule.id;
							b.group_id = $scope.activeModule.granted[k];
							$scope.Gs.push(b);
						}
					}
				}
		};
		$scope.revoke = function(index){
			$scope.activeModule.revoked.push($scope.Gs[index]);
			$scope.Rs.push($scope.Gs[index]);
			$scope.activeModule.granted.splice(index,1);
			$scope.Gs.splice(index,1);
			var a = $scope.activeModule;
			//console.log(a);
			var success = function(response){
			};
			var error = function(response){
				
			};
			api.POST('modules',a,success,error);
		};
		$scope.grant = function(index){
			$scope.activeModule.granted.push($scope.Rs[index]);
			$scope.Gs.push($scope.Rs[index]);
			$scope.activeModule.revoked.splice(index,1);
			$scope.Rs.splice(index,1);
			var b = $scope.activeModule;
			var success = function(response){
			};
			var error = function(response){
				
			};
			api.POST('modules',b,success,error);
		}; */