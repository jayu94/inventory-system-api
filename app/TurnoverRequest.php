<?php

namespace App;
use DB;
use Illuminate\Database\Eloquent\Model;

class TurnoverRequest extends Model
{
	public static function GetItemById($code){
    	$results = DB::table('@TURNOVERREQUEST')
            ->innerJoin('@TURNOVERREQUESTITEM', '@TURNOVERREQUESTITEM.TurnOverRequestID', '=', '@TURNOVERREQUEST.TurnOverRequestID')
            ->where('@TURNOVERREQUESTITEM.ItemCode',$code)
            ->get();

         return $results;
	}

	public static function GetAllItems(){
		$results = DB::table('@TURNOVERREQUEST')->get();
        return $results;
	}

	public static function ProcessTurnover($request){
		$userId = $request->input('UserId');
		$status = $request['Status'];
		$requestDate = Date('Y-m-d H:i:s');
		$Department = $request->input['Department'];

		$result = DB::table('@TURNOVERREQUEST')->insertGetId(array(
        	'UserID' => $userId ,
        	'StatusID' => $status,
            'RequestDate' => $transferDate,
            'Department' => $Department
            )
		);

		if($result) {
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
                    
                    /*$newQty = floatval($value['Qty']) - floatval($value['ToQty']); 
					if($resultDetails){
						DB::update('Update OITM set TreeQty = ? Where ItemCode = ? ', [$newQty, $value['ItemCode']]);
					}*/
				}
			}

		}

	    if($result) return array('status' => 'ok', 'items' => $request->input('Items'), 'return_id' => $result);
		else return array('status' => 'failed', 'items' => $request->input('Items'), 'return_id' => $result);
	}
}