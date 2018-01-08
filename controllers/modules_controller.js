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
		function PasaLoad(){
			$scope.Rs = [];
			$scope.Gs = [];
			$scope.i;
			for ($scope.i in $scope.Groups){
				Pasa();
				Load();
			}
		};
		function Pasa(){
				for (var j in $scope.activeModule.revoked){
					if ($scope.activeModule.revoked){
						if ($scope.Groups[$scope.i].id == $scope.activeModule.revoked[j]){
							var a = [];
							a.id = $scope.activeModule.id;
							a.laman = $scope.activeModule.revoked[j];
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
							b.laman = $scope.activeModule.granted[k];
							$scope.Gs.push(b);
						}
					}
				}
		};
		$scope.init = function(){
			$scope.Modules = [];
			$scope.Groups = [];
			$scope.Message = null;
			LoadModules();
			LoadGroups();
		};
		$scope.SetActiveModule = function(module){
			$scope.activeModule = module;
			//console.log($scope.activeModule);
			PasaLoad();
		};
		$scope.revoke = function(index){
			data = $scope.Gs[index];
			data.action = "revoke";
			var success = function(response){
				LoadModules();
				$scope.activeModule = response.data;
				PasaLoad();
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
				PasaLoad();
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
								PasaLoad();
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
		/*$scope.revoke = function(index){
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
		};*/