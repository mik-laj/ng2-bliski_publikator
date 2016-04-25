<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
// Start: $ php -S localhost:3005 -t . server.php
function response_json_file($file_name){
	if(!file_exists($file_name)){
		echo "File: " . $file_name . " don't exists";
	}
	header('Content-Type: application/json');
	echo file_get_contents($file_name);
	die();
}
if($_SERVER['REQUEST_URI'] == '/api/answer' && $_SERVER['REQUEST_METHOD'] == 'POST'){
	response_json_file('api/answer-post-ok.json');
}else if($_SERVER['REQUEST_URI'] == '/api/monitoring/1' && $_SERVER['REQUEST_METHOD'] == 'GET'){
	response_json_file('api/monitoring-1-get-ok.json');
}else if($_SERVER['REQUEST_URI'] == '/api/organization/1' && $_SERVER['REQUEST_METHOD'] == 'GET'){
	response_json_file('api/organization-1-get-ok.json');
}
echo '<pre>';
echo "_SERVER['REQUEST_URI'] = ". $_SERVER['REQUEST_URI']."\n";
echo "_SERVER['REQUEST_METHOD'] = ".$_SERVER['REQUEST_METHOD']."\n";
echo '<pre>';
