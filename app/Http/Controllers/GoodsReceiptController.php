<?php

namespace App\Http\Controllers;

use App\GoodsReceipt;
use Illuminate\Http\Request;

class GoodsReceiptController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $response = GoodsReceipt::all();
		return response()->json($response);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
		$gr = new GoodsReceipt();		
		$gr->UserId = $request->input('UserId');
		$gr->Source = $request->input('Source');
		$gr->GrStatusId = 1;
		$gr->ReceivingDate = $request->input('ReceivingDate');
		//$gr->DocumentDate = 'GETDATE()';
		if($gr->save()){
			$response['status'] = 'ok';
			$response['GoodsReceipt'] = $gr;
		}else{
			$response['status'] = 'failed';
		}
		
		return response()->json($response);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\GoodsReceipt  $goodsReceipt
     * @return \Illuminate\Http\Response
     */
    public function show(GoodsReceipt $goodsReceipt)
    {
        //
		
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\GoodsReceipt  $goodsReceipt
     * @return \Illuminate\Http\Response
     */
    public function edit(GoodsReceipt $goodsReceipt)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\GoodsReceipt  $goodsReceipt
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GoodsReceipt $goodsReceipt)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\GoodsReceipt  $goodsReceipt
     * @return \Illuminate\Http\Response
     */
    public function destroy($GrId)
    {
        //
		$gr = GoodsReceipt::find($GrId);
		if($gr->delete()){
			$response['status'] = 'ok';
		}else{
			$response['status'] = 'failed';
		}
		return response()->json($response);
    }
}
