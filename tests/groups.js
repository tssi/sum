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
				  "modules": [2,3]
				}
	];
	var obj = {meta:meta,data:data};
	var groups = new $model(obj);
	return groups;
});