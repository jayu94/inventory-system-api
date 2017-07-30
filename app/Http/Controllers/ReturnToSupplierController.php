<?php

namespace App\Http\Controllers;
use App\ReturnToSupplier;
use DB;
use Illuminate\Http\Request;

class ReturnToSupplierController extends Controller
{
    
    public function index($code = null)
    {
        $results = array();
        $mi = new ReturnToSupplier();
        if(empty($name)){
            $results = $mi->GetAllItems();
        }else{
            $results = $mi->GetItemById($id);
        }

        return response()->json($results);
    }

    public function submit(Request $request){  
        $wi = new ReturnToSupplier();
        $results = $wi->ProcessReturnToSupplier($request);
        return response()->json($results);
    }

}
