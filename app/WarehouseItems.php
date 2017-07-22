<?php

namespace App;
use DB;
use Illuminate\Database\Eloquent\Model;

class WarehouseItems extends Model
{
	public static function GetItemById($code){
    	$t1 = '[dbo].[@WAREHOUSETRANSFER]';
    	$t2 = '[dbo].[@WAREHOUSETRANSFERITEM]';
        	 
    	$results = DB::select("Select * from $t1 as a left join  t2 as b on b.WarehouseTransferID = a.ID Where b.ItemCode = ?", array($code));

         return $results;
	}

	public static function GetAllItems(){
		
		$t1 = '[dbo].[@WAREHOUSETRANSFER]';
    	$t2 = '[dbo].[@WAREHOUSETRANSFERITEM]';
        $results = DB::select("Select * from $t1 as a left join $t2 as b on b.WarehouseTransferID = a.ID");

        return $results;
	}

	public static function ProcessWarehouseTransfer($request){
		$userId = $request->input('UserId');
		$status = $request['Status'];
		$transferDate = Date('Y-m-d H:i:s');

		$result = DB::table('@WAREHOUSETRANSFER')->insertGetId(array(
        	'UserID' => $userId ,
        	'WTStatus' => $status,
            'TransferDate' => $transferDate)
		);

		if($result) {
			$items = $request->input('Items');
			if(!empty($items)){
				foreach ($items as $key => $value) {
				    $resultDetails = DB::table('@WAREHOUSETRANSFERITEM')->insert(
						array('WarehouseTransferID' => $result,
							  'ItemCode' => $value['ItemCode'],
							  'UoM' => $value['Uom'],
							  'UnitPrice' => $value['Price'],
							  'OriginalQuantityTo' => $value['ToQty'],
							  'QuantityNeededTo' => $value['ToQtyRequested'],
							  'WarehouseTo' => $value['ToWarehouse'],
							  'CostCenterTo' => $value['ToCostCenter'],
							  'ReasonForTransfer' => $value['Reasons'],
							  'LineNum' => 0
							 )
					);
                    
                    $newQty = floatval($value['Qty']) - floatval($value['ToQty']); 
					if($resultDetails){
						DB::update('Update OITM set TreeQty = ? Where ItemCode = ? ', [$newQty, $value['ItemCode']]);
					}
				}
			}

		}

	    if($result) return array('status' => 'ok', 'items' => $request->input('Items'), 'return_id' => $result);
		else return array('status' => 'failed', 'items' => $request->input('Items'), 'return_id' => $result);
	}
}
