<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IssuanceAcceptance extends Model
{
    //
	protected $table = '@ISSUANCEACCEPTANCE';
	public $timestamps = false;
	protected $primaryKey = 'IssuanceAcceptanceID';
	
	public static function all($columns = array()){
		$items = IssuanceAcceptance::query()
					->leftjoin('@OUSR as user', 'user.UserId', '=', '@ISSUANCEACCEPTANCE.UserID')
					->leftjoin('@STATUS as s', 's.ID', '=', '@ISSUANCEACCEPTANCE.StatusID')
					->get();
					
		return $items;
	}
}
