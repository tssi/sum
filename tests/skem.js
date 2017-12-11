define(['model'],function($model){
	var meta =  {
					title:"Users"
				};
	var data = [
				{
				  "id": 1,
				  "last_name": "Dela Cruz",
				  "first_name": "Juan",
				  "middle_name": "A",
				  "username": "admin",
				  "password": "password",
				  "status": "ACTIVE",   
				  "group_id": "ADMIN"
				}
	];
	var obj = {meta:meta,data:data};
	var users = new $model(obj);
	return users;
});