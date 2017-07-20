<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GoodsReceipt extends Model
{
    //
	protected $table = '@GOODSRECEIPT';
	public $timestamps = false;
	protected $primaryKey = 'GrId';
}
