define(['app','api'],function(app){
	app.register.controller('ModulesController',['$scope','api','$uibModal',function($scope,api,$uibModal){
		function LoadModules(data){
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
		function LoadGroups(){
			var success = function(response){
				$scope.Groups = response.data;
			};
			var error = function(response){
			};
			api.GET('groups',success,error);
		};
		function LoadRevokedGranted(){
			$scope.Revoked = [];
			$scope.Granted = [];
			for (var i in $scope.Groups){
				var group = $scope.Groups[i];
				if ($scope.activeModule.revoked.indexOf(group.id) != -1){
							var a = [];
							a.id = $scope.activeModule.id;
							a.group_id = group.id;
							$scope.Revoked.push(a);
				}
				if ($scope.activeModule.granted.indexOf(group.id) != -1){
							var a = [];
							a.id = $scope.activeModule.id;
							a.group_id = group.id;
							$scope.Granted.push(a);
				}
			}
		};
		$scope.init = function(){
			$scope.Modules = [];
			$scope.Groups = [];
			$scope.ActivePage = 1;
			$scope.NextPage = null;
			$scope.PrevPage = null;
			LoadGroups();
			LoadModules({page:$scope.ActivePage});
		};
		$scope.navigatePage = function(page){
			console.log(page);
			$scope.ActivePage = page;
			LoadModules({page:$scope.ActivePage});
		};
		$scope.SetActiveModule = function(module){
			$scope.activeModule = module;
			LoadRevokedGranted();
		};
		$scope.clearSearch = function(){
			$scope.SearchModule = "";
		};
		$scope.revoke = function(index){
			data = $scope.Granted[index];
			data.action = "revoke";
			var success = function(response){
				LoadModules();
				$scope.activeModule = response.data;
				LoadRevokedGranted();
			};
			var error = function(response){
				
			};
			api.POST('modules',data,success,error);
		};
		$scope.grant = function(index){
			data = $scope.Revoked[index];
			data.action = "grant";
			var success = function(response){
				LoadModules();
				$scope.activeModule = response.data;
				LoadRevokedGranted();
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
			if(!mode){
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
								LoadModules();
								$scope.activeModule = data;
								LoadRevokedGranted();
							};
			var fallback = function(data){
							};
			promise.then(callback,fallback);
		};
	//};
	}]);
	app.register.controller('ModuleModalController',['$scope','$uibModalInstance','api','ActiveModule','Mode',function($scope,$uibModalInstance,api,ActiveModule,Mode){
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
		};
		function LoadModules(){
			var success = function(response){
				$scope.Modules = response.data;
				$scope.NextPage = response.meta.next;
				$scope.PrevPage = response.meta.prev;
				$scope.TotalItems=response.meta.count;
				$scope.LastItem=response.meta.page*response.meta.limit;
				$scope.FirstItem=$scope.LastItem-(response.meta.limit-1);
				if($scope.LastItem>$scope.TotalItems){
					$scope.LastItem=$scope.TotalItems;
				};
				$scope.DataLoading = false;	
				//console.log(response.data);
			};
			var error = function(response){
			};
			api.GET('modules',success,error);
		};
		function LoadModules(data){
			$scope.DataLoading=true;
			api.GET('modules',data,function success(response){
				$scope.Modules=response.data;
				$scope.NextPage=response.meta.next;
				$scope.PrevPage=response.meta.prev;
				$scope.TotalItems=response.meta.count;
				$scope.LastItem=response.meta.page*response.meta.limit;
				$scope.FirstItem=$scope.LastItem-(response.meta.limit-1);
				if($scope.LastItem>$scope.TotalItems){
					$scope.LastItem=$scope.TotalItems;
				};
				$scope.DataLoading = false;							
			});
		} */