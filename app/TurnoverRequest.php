<?php

namespace App;
use DB;
use Illuminate\Database\Eloquent\Model;

class TurnoverRequest extends Model
{
	public static function GetItemById($code){
    	$results = DB::table('@TURNOVERREQUEST')
            ->leftJoin('@TURNOVERREQUESTITEM', '@TURNOVERREQUESTITEM.TurnOverRequestID', '=', '@TURNOVERREQUEST.TurnOverRequestID')
            ->where('@TURNOVERREQUESTITEM.ItemCode',$code)
            ->get();
		return $results;
	}

	public static function GetTurnoverRequestItems($itemId){
		$data = DB::table('@TURNOVERREQUESTITEM')
					 ->where('@TURNOVERREQUESTITEM.TurnOverRequestID',$itemId)
				     ->get();
				

		return $data;
	}

	public static function GetAllItems(){
		$results = DB::table('@TURNOVERREQUEST')->get();
		$itemsToReturn = array();
		if(!empty($results)){
			foreach ($results as $key => $value) {
				$items =  json_decode(self::GetTurnoverRequestItems($value->TurnOverRequestID));
				$turnoverRequestItems = array_merge((array)$value, array("Items" => $items));
				array_push($itemsToReturn,$turnoverRequestItems);
			}

		}		
        return $itemsToReturn;
	}

	

	public static function ProcessTurnover($request){
		$userId = $request->input('UserId');
		$status = $request->input('Status');
		$requestDate = Date('Y-m-d H:i:s');
		$department = $request->input('Department');

		$result = DB::table('@TURNOVERREQUEST')->insertGetId(array(
        	'UserID' => $userId ,
        	'StatusID' => $status,
            'RequestDate' => $requestDate,
            'Department' => $department
            )
		);

		if((int) $result > 0) {
			$items = $request->input('Items');
			if(!empty($items)){
				foreach ($items as $key => $value) {
				    $resultDetails = DB::table('@TURNOVERREQUESTITEM')->insert(
						array('TurnOverRequestID' => $result,
							  'ItemCode' => $value['ItemCode'],
							  'Specification' => $value['Specification'],
							  'Quantity' => $value['Quantity'],
							  'Reasons' => $value['Reasons'],
							  'JobOrderNo' => $value['JobOrderNo'],
							  'JobOrderDesc' => $value['JobOrderDesc'],
							  'isReceived' => 0
							)
					);
                }
			}

		}

	    if((int) $result > 0) return array('status' => 'ok', 'items' => $request->input('Items'), 'return_id' => $result);
		else return array('status' => 'failed', 'items' => $request->input('Items'), 'return_id' => $result);
	}
}