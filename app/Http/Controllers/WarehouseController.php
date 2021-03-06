<?php

namespace App\Http\Controllers;
use App\WarehouseItems;
use DB;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    public function index($code = null)
    {
        $results = array();
        $mi = new WarehouseItems();
        if(empty($name)){
            $results = $mi->GetAllItems();
        }else{
            $results = $mi->GetItemById($id);
        }

        return response()->json($results);
    }

    public function submit(Request $request){  
        $wi = new WarehouseItems();
        $results = $wi->ProcessWarehouseTransfer($request);
        return response()->json($results);
    }
}
