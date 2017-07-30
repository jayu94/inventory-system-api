<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IssuanceItem extends Model
{
    //
	protected $table = '@ISSUANCEITEMS';
	public $timestamps = false;
	protected $primaryKey = 'EntryID';
	
	public static function findByIssuanceID($id = null){
		if($id == null){
			return array();
		}
		
		$items = IssuanceItem::query()
					->where('@ISSUANCEITEMS.IssuanceID', $id)
					->get([
						'@ISSUANCEITEMS.*'
					]);

		return $items;
	}
	
}
