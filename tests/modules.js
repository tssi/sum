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
					"revoked":[],
					"granted":['ADMIN','USER']
				}
	];
	var obj = {meta:meta,data:data};
	var Module = new $model(obj);
	Module.POST =  function(data){
		console.log(data);
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
				return {success:Module.save(data)};
			break;
		}
	}
	return Module;
});