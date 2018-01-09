"use strict";
define(["model"],function($model){
	var meta =  {
					title:"Modules"
				};
	var data = [
				{
					"id": 1,
					"name":"Account Management",
					"url":"#/accounts/index",
					"revoked":['USER'],
					"granted":[]
				},
				{
					"id": 2,
					"name":"Home",
					"url":"#/",
					"revoked":[],
					"granted":['ADMIN']
				},
				{
					"id": 3,
					"name":"Logout",
					"url":"#/logout",
					"revoked":['USER'],
					"granted":['ADMIN']
				},
				{
					"id": 4,
					"name":"Trip Lungs",
					"url":"#/trip",
					"revoked":['ADMIN','USER'],
					"granted":[]
				}
	];
	var obj = {meta:meta,data:data};
	var Module = new $model(obj);
	Module.POST =  function(data){
		//console.log(data);
		switch(data.action){
			case 'register':
				data.revoked = [];
				data.granted = [];
				return {success:Module.save(data)};
			break;
			case 'edit':
				return {success:Module.save(data)};
			break;
			case 'revoke':
				var modules = Module.data;
				var activemodule;
				var b = data.group_id;
				for (var a in modules){
					if (modules[a].id == data.id){
						console.log(modules[a].id,data.id);
						activemodule = modules[a];
						var index = activemodule.granted.indexOf(b);
						activemodule.revoked.push(activemodule.granted[index]);
						activemodule.granted.splice(index,1);
					}
				}
				return {success:Module.save(activemodule)};
			break;
			case 'grant':
				var modules = Module.data;
				var activemodule;
				var b = data.group_id;
				for (var a in modules){
					if (modules[a].id == data.id){
						console.log(modules[a].id,data.id);
						activemodule = modules[a];
						var index = activemodule.revoked.indexOf(b);
						activemodule.granted.push(activemodule.revoked[index]);
						activemodule.revoked.splice(index,1);
					}
				}
				return {success:Module.save(activemodule)};
			break;
			/* 
			case 'revoke':
				var activemodule;
				var modules = Module.data;
				for (var a in modules){
					if (modules[a].id == data.id){
						activemodule = modules[a];
						for (var b in activemodule.granted){
							//console.log(activemodule.granted[b]);
							if (activemodule.granted[b] == data.laman){
								//console.log(activemodule.granted[b]);
								activemodule.revoked.push(activemodule.granted[b]);
								activemodule.granted.splice(b,1);
							}
						}
					}
				}
				return {success:Module.save(activemodule)};
			break;
			case 'grant':
				var activemodule;
				var modules = Module.data;
				for (var a in modules){
					if (modules[a].id == data.id){
						activemodule = modules[a];
						for (var b in activemodule.revoked){
							if (activemodule.revoked[b] == data.laman){
								activemodule.granted.push(activemodule.revoked[b]);
								activemodule.revoked.splice(b,1);
							}
						}
					}
				}
				return {success:Module.save(activemodule)};
			break; */
		}
	}
	return Module;
});