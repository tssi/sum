"use strict";
define(["model"],function($model){
	var meta =  {
					title:"Groups"
				};
	var data = [
				{
				  "id": "ADMIN",
				  "name": "Admin",
				  "modules": [1,3]
				},
				{
				  "id": "USER",
				  "name": "User",
				  "modules": [2]
				},
				{
				  "id": "a",
				  "name": "User",
				  "modules": [3]
				},
				{
				  "id": "b",
				  "name": "User",
				  "modules": [1]
				},
				{
				  "id": "c",
				  "name": "User",
				  "modules": [2,3]
				},
				{
				  "id": "d",
				  "name": "User",
				  "modules": [1,2]
				}
	];
	var obj = {meta:meta,data:data};
	var Group = new $model(obj);
	Group.POST =  function(data){
		console.log(data);
		switch(data.action){
			case 'add':
				return {success:Group.save(data)};
			break;
			case 'edit':
				return {success:Group.save(data)};
			break;
			/* case 'register':
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
				var group_id = data.group_id;
				for (var ctr in modules){
					if (modules[ctr].id == data.id){
						console.log(modules[ctr].id,data.id);
						activemodule = modules[ctr];
						var index = activemodule.granted.indexOf(group_id);
						activemodule.revoked.push(activemodule.granted[index]);
						activemodule.granted.splice(index,1);
					}
				}
				return {success:Module.save(activemodule)};
			break; */
		}
	}
	return Group;
});