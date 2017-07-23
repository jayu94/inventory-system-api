<?php

namespace App;
use DB;
use Illuminate\Database\Eloquent\Model;

class MaterialMaster extends Model
{
  
	public function GetItems(){
		$result =  DB::select("select  Top 10
                                ItemCode,  
                                ItemName,
                                InvntryUom as Uom,
                                LastPurPrc as Price,
                                TreeQty as Qty,
                                '' as WarehouseFrom,
                                '' as QtyNeeded,
                                '' as CostCenterFrom,
                                '' as EmployeeName
                              from 
                                 OITM");
		return $result;
	}

	public function GetItemsByCode($code){
 
		$result =  DB::select("select  Top 10
                                ItemCode,  
                                ItemName,
                                InvntryUom as Uom,
                                LastPurPrc as Price,
                                TreeQty as Qty,
                                '' as WarehouseFrom,
                                '' as QtyNeeded,
                                '' as CostCenterFrom,
                                '' as EmployeeName
                              from 
                                 OITM
                              Where 
                                ItemCode like ?",
                                 array('%'.$code.'%')
                                 );
		return $result;
	}
}
