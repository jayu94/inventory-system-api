<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GoodsReceiptItem extends Model
{
    //
	protected $table = '@GOODSRECEIPTITEMS';
	public $timestamps = false;
	protected $primaryKey = 'ItemEntry';
	
	public function findByDocEntry($id = null){
		if($id == null){
			return array();
		}
		
		$items = GoodsReceiptItem::query()
					->where('@GOODSRECEIPTITEMS.DocEntry', $id)
					->get([
						'@GOODSRECEIPTITEMS.*'
					]);

		return $items;
	}
	
	
	
}
