<?php

namespace App;
use DB;
use Illuminate\Database\Eloquent\Model;

class PhysicalInventoryCount extends Model
{
	public static function GetItemById($code){
    	return DB::table('@PHYSICALINVENTORYCOUNT')
            ->leftJoin('@PHYSICALINVENTORYCOUNTITEM', '@PHYSICALINVENTORYCOUNTITEM.PICId', '=', '@PHYSICALINVENTORYCOUNT.ID')
            ->where('@PHYSICALINVENTORYCOUNTITEM.ItemCode',$code)ITEM
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
							  'ItemCode' => $value['ItemCode'],
							  'ItemDescription' => $value['Specification'],
							  'UoM' => $value['UoM'],
							  'Freeze' => $value['Freeze'],
							  'Counted' => $value['Counted'],
							  'Counter' => $value['Counter'],
							  'Checker' => $value['Checker'],
							  'Validator' => $value['Validator'],
							  'Specification' => $value['Specification']
                              'SerialNo' => $value['SerialNo'],
                              'PropertyCode' => $value['PropertyCode'],
                              'LocationOnRecord' => $value['LocationOnRecord'],
                              'LocationPhysical' => $value['LocationPhysical'],
                              'Variance' => $value['Variance'],
                              'Remarks' => $value['Remarks']
							)
					);
                }
			}

		}

	    if((int) $result > 0) return array('status' => 'ok', 'items' => $request->input('Items'), 'return_id' => $result);
		else return array('status' => 'failed', 'items' => $request->input('Items'), 'return_id' => $result);
	}
}