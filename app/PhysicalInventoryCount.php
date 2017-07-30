<?php

namespace App;
use DB;
use Illuminate\Database\Eloquent\Model;

class PhysicalInventoryCount extends Model
{
	public static function GetItemById($code){
    	return DB::table('@PHYSICALINVENTORYCOUNT')
            ->leftJoin('@PHYSICALINVENTORYCOUNTITEM', '@PHYSICALINVENTORYCOUNTITEM.PICId', '=', '@PHYSICALINVENTORYCOUNT.ID')
            ->where('@PHYSICALINVENTORYCOUNTITEM.ItemCode',$code)
            ->get();

    }

	public static function GetAllItems(){
		return DB::table('@PHYSICALINVENTORYCOUNT')
            ->leftJoin('@PHYSICALINVENTORYCOUNTITEM', '@PHYSICALINVENTORYCOUNTITEM.PICId', '=', '@PHYSICALINVENTORYCOUNT.ID')
            ->get();

	}

	public static function ProcessPhysicalInventoryCount($request){
		
		$userId = $request->input('UserId');
		$status = $request->input('Status');
		$department = $request->input('Department');
		$uploadDate = $request->input('UploadDate');
		$remarks = $request->input('Remarks');
		$itemClass = $request->input('ItemClass');
		$location = $request->input('Location');
		$accPerson = $request->input('AccountablePerson');
        $majorAssetCat = $request->input('MajorAssetCategory');
        $commodityGrp = $request->input('CommodityGroup');
        $warehouse = $request->input('Warehouse');

		$result = DB::table('@PHYSICALINVENTORYCOUNT')->insertGetId(array(
        	'UserID' => $userId ,
        	'Department' => $department,
            'PICDate' => Date('Y-m-d H:i:s'),
            'PICStatus' => $status,
            'UploadDate' => $uploadDate,
            'Remarks' => $remarks,
            'ItemClass' => $itemClass,
            'Location' => $location,
            'AccountablePerson' => $accPerson,
            'MajorAssetCategory' => $majorAssetCat,
            'CommodityGroup' => $commodityGrp,
            'Warehouse' => $warehouse
            )
		);

		if((int) $result > 0) {
			$items = $request->input('Items');
			if(!empty($items)){
				foreach ($items as $key => $value) {
				    $resultDetails = DB::table('@PHYSICALINVENTORYCOUNTITEM')->insert(
						array('PICId' => $result,
							  'ItemCode' => isset($value['ItemCode'])?$value['ItemCode']:'',
							  'ItemDescription' => isset($value['ItemDescription'])?$value['ItemDescription']:'',
							  'UoM' => isset($value['UoM'])?$value['UoM']:'',
							  'Freeze' => isset($value['Freeze'])?$value['Freeze']:'',
							  'Counted' => isset($value['Counted'])?$value['Counted']:'',
							  'Counter' => isset($value['Counter'])?$value['Counter']:'',
							  'Checker' => isset($value['Checker'])?$value['Checker']:'',
							  'Validator' => isset($value['Validator'])?$value['Validator']:'',
							  'Specification' => isset($value['Specification'])?$value['Specification']:'',
                              'SerialNo' => isset($value['SerialNo'])?$value['SerialNo']:'',
                              'PropertyCode' => isset($value['PropertyCode'])?$value['PropertyCode']:'',
                              'LocationOnRecord' => isset($value['LocationOnRecord'])?$value['LocationOnRecord']:'',
                              'LocationPhysical' => isset($value['LocationPhysical'])?$value['LocationPhysical']:'',
                              'Variance' => isset($value['Variance'])?$value['Variance']:'',
                              'Remarks' => isset($value['Remarks'])?$value['Remarks']:'',

                              'AssetStatusOnRecord' => isset($value['AssetStatusOnRecord'])?$value['AssetStatusOnRecord']:'',
                              'AssetStatusPhysical' => isset($value['AssetStatusPhysical'])?$value['AssetStatusPhysical']:'',
                              'Warehouse' => isset($value['Warehouse'])?$value['Warehouse']:'',
                              'QtyOnCountDate' => isset($value['QtyOnCountDate'])?$value['QtyOnCountDate']:'',
                              'CountedQuantity' => isset($value['CountedQuantity'])?$value['CountedQuantity']:'',
                              'AssetStatusVariance' => isset($value['AssetStatusVariance'])?$value['AssetStatusVariance']:'',
                              'AssetStatusRemarks' => isset($value['AssetStatusRemarks'])?$value['AssetStatusRemarks']:'',
                              'QuantityVariance' => isset($value['QuantityVariance'])?$value['QuantityVariance']:'',
                              'QuantityRemarks' => isset($value['QuantityRemarks'])?$value['QuantityRemarks']:''

							)
					);
                }
			}

		}

	    if((int) $result > 0) return array('status' => 'ok', 'items' => $request->input('Items'), 'return_id' => $result);
		else return array('status' => 'failed', 'items' => $request->input('Items'), 'return_id' => $result);
	}
}