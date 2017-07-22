<?php

namespace App\Http\Controllers;
use App\WarehouseItems;
use DB;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

    /**
     * get item by code
     *
     *  
    */
    public function submit(Request $request){  
        $wi = new WarehouseItems();
        $results = $wi->ProcessWarehouseTransfer($request);
        return response()->json($results);
    }

}
