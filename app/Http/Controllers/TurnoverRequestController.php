<?php

namespace App\Http\Controllers;
use App\TurnoverRequest;
use DB;
use Illuminate\Http\Request;

class TurnoverRequestController extends Controller
{
    
    public function index($code = null)
    {
        $results = array();
        $mi = new TurnoverRequest();
        if(empty($name)){
            $results = $mi->GetAllItems();
        }else{
            $results = $mi->GetItemById($id);
        }

        return response()->json($results);
    }

    public function submit(Request $request){  
        $wi = new TuronverRequest();
        $results = $wi->ProcessTurnover($request);
        return response()->json($results);
    }

}
