"use strict";
define(["model"],function($model){
	var meta =  {
					title:"Modules"
				};
	var data = [
				{
				  "id": "ADMIN",
				  "name": "Admin",
				  "modules":[ 1 ]
				},
				{
				  "id": "USER",
				  "name": "User",
				  "modules":[ 2 ]
				}
	];
	var obj = {meta:meta,data:data};
	var groups = new $model(obj);
	return groups;
});