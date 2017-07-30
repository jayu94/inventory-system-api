<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IssuanceItem extends Model
{
    //
	protected $table = '@ISSUANCEITEMS';
	public $timestamps = false;
	protected $primaryKey = 'EntryID';
}
