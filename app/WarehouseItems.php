<?php

namespace App;
use DB;
use Illuminate\Database\Eloquent\Model;

class WarehouseItems extends Model
{
	public static function GetItemById($code){
		$results = DB::table('@WAREHOUSETRANSFER')
            ->innerJoin('@WAREHOUSETRANSFERITEM', '@WAREHOUSETRANSFERITEM.WarehouseTransferID', '=', '@WAREHOUSETRANSFER.WTNo')
            ->where('@WAREHOUSETRANSFER.ItemCode',$code)
            ->get();

         return $results;
	}

	public static function GetAllItems(){
		$results = DB::table('@WAREHOUSETRANSFER')->get();

        $itemsToReturn = array();
		if(!empty($results)){
			foreach ($results as $key => $value) {
				$items =  json_decode(self::GetAllWarehouseDetailItems($value->WTNo));
				$warehouseTransferItems = array_merge((array)$value, array("Items" => $items));
				array_push($itemsToReturn,$warehouseTransferItems);
			}

		}		
        return $itemsToReturn;
        
	}

	public static function GetAllWarehouseDetailItems($id){

		$data = DB::table('@WAREHOUSETRANSFERITEM')
					 ->where('@WAREHOUSETRANSFERITEM.WarehouseTransferID',$id)
				     ->get();
				

		return $data;
	}

	public static function ProcessWarehouseTransfer($request){
		$userId = $request->input('UserId');
		$status = $request->input('Status');
		$transferDate = Date('Y-m-d H:i:s');

		$result = DB::table('@WAREHOUSETRANSFER')->insertGetId(array(
        	'UserID' => $userId ,
        	'WTStatus' => $status,
            'TransferDate' => $transferDate)
		);

		if((int) $result > 0) {
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

	    if((int) $result > 0) return array('status' => 'ok', 'items' => $request->input('Items'), 'return_id' => $result);
		else return array('status' => 'failed', 'items' => $request->input('Items'), 'return_id' => $result);
	}
}
