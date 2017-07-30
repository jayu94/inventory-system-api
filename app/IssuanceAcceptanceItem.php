<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IssuanceAcceptanceItem extends Model
{
    //
	protected $table = '@ISSUANCEACCEPTANCEITEMS';
	public $timestamps = false;
	protected $primaryKey = 'EntryID';
	
	public static function findByIssuanceAcceptanceID($id = null){
		if($id == null){
			return array();
		}
		
		$items = IssuanceAcceptanceItem::query()
					->where('@ISSUANCEACCEPTANCEITEMS.IssuanceAcceptanceID', $id)
					->get([
						'@ISSUANCEACCEPTANCEITEMS.*'
					]);

		return $items;
	}
	
}
