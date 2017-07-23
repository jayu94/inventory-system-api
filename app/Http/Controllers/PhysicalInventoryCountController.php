<?php

namespace App\Http\Controllers;
use App\PhysicalInventoryCount;
use DB;
use Illuminate\Http\Request;

class PhysicalInventoryCountController extends Controller
{
    public function index($code = null)
    {
        $results = array();
        $mi = new PhysicalInventoryCount();
        if(empty($name)){
            $results = $mi->GetAllItems();
        }else{
            $results = $mi->GetItemById($id);
        }

        return response()->json($results);
    }

    public function submit(Request $request){  
        $wi = new PhysicalInventoryCount();
        $results = $wi->ProcessPhysicalInventoryCount($request);
        return response()->json($results);
    }
}