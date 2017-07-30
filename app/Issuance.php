<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Issuance extends Model
{
    //
	protected $table = '@ISSUANCE';
	public $timestamps = false;
	protected $primaryKey = 'IssuanceID';
	
	public static function all($columns = array()){
		$items = Issuance::query()
					->leftjoin('@OUSR as user', 'user.UserId', '=', '@ISSUANCE.UserID')
					->leftjoin('@STATUS as s', 's.ID', '=', '@ISSUANCE.StatusID')
					->get();
					
		return $items;
	}
}
