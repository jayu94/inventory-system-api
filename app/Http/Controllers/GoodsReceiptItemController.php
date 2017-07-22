<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\GoodsReceiptItem;

class GoodsReceiptItemController extends Controller
{
    public function index()
    {
        $response = GoodsReceiptItem::all();
		return response()->json($response);
    }
}
