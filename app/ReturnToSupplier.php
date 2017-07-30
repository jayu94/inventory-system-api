<?php

namespace App;
use DB;
use Illuminate\Database\Eloquent\Model;

class ReturnToSupplier extends Model
{
	public static function GetItemById($code){
    	return DB::table('@RETURNTOSUPPLIER')
            ->leftJoin('@RETURNTOSUPPLIERITEM', '@RETURNTOSUPPLIERITEM.ReturnToSupplierID', '=', '@RETURNTOSUPPLIER.ReturnToSupplierID')
            ->where('@RETURNTOSUPPLIERITEM.ItemCode',$code)
            ->get();

    }

	public static function GetAllItems(){
		$results =  DB::table('@RETURNTOSUPPLIER')->get();
		$itemsToReturn = array();
		
		if(!empty($results)){
			foreach ($results as $key => $value) {
				$items =  json_decode(self::GetAllItemsById($value->ReturnToSupplierID));
				$returnToSupplierItems = array_merge((array)$value, array("Items" => $items));
				array_push($itemsToReturn,$returnToSupplierItems);
			}
		}

		return $itemsToReturn;
	}

	public static function GetAllItemsById($id){

		$data = DB::table('@RETURNTOSUPPLIERITEM')
					 ->where('@RETURNTOSUPPLIERITEM.ReturnToSupplierID',$id)
				     ->get();
				

		return $data;
	}

	public static function ProcessReturnToSupplier($request){
		
		$userId = $request->input('UserId');
		$status = $request->input('Status');
		$department = $request->input('Department');
		$vendorCode = $request->input('VendorCode');
		$vendorName = $request->input('VendorName');
		$address = $request->input('Address');
		$contactPerson = $request->input('ContactPerson');
		$contactNumber = $request->input('ContactNumber');
        $status = $request->input('Status');
        $receivingRequestId = $request->input('ReceivingRequestID');
        
		$result = DB::table('@RETURNTOSUPPLIER')->insertGetId(array(
        	'UserId' => $userId ,
        	'Department' => $department,
            'VendorCode' => $vendorCode,
            'VendorName' => $vendorName,
            'Address' => $address,
            'ContactPerson' => $contactPerson,
            'ContactNumber' => $contactNumber,
            'StatusID' => $status,
            'RecevingRequestID' => $receivingRequestId,
            'Date' => Date('Y-m-d H:i:s')
            )
		);

		if((int) $result > 0) {
			$items = $request->input('Items');
			if(!empty($items)){
				foreach ($items as $key => $value) {
				    $resultDetails = DB::table('@RETURNTOSUPPLIERITEM')->insert(
						array('ReturnToSupplierID' => $result,
							  'ItemCode' => $value['ItemCode'],
							  'Specification' => $value['Specification'],
							  'Reasons' => $value['Reasons'],
							  'ExpectedPullOutDate' => $value['ExpectedPullOutDate'],
							  'ExpectedReturnDate' => $value['ExpectedReturnDate'],
							  'isPullOut' => $value['IsPullOut'],
							  'ActualPullOutDate' => $value['ActualPullOutDate'],
							  'IsForPrint' => $value['IsForPrint'],
							  'PONo' => $value['PONo']
            
							)
					);
                }
			}

		}

	    if((int) $result > 0) return array('status' => 'ok', 'items' => $request->input('Items'), 'return_id' => $result);
		else return array('status' => 'failed', 'items' => $request->input('Items'), 'return_id' => $result);
	}
}