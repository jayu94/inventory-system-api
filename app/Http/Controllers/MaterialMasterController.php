<?php

namespace App\Http\Controllers;

use App\MaterialMaster;
use Illuminate\Http\Request;

class MaterialMasterController extends Controller
{
    
        
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public static function index($code = null)
    {
        $result = array();
        $m = new MaterialMaster();
            
        if(empty($code)){
            $result = $m->GetItems();
        }else{
            $result = $m->GetItemsByCode($code);
        }

        return response()->json($result);
    }
}
