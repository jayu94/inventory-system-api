<?php

namespace App\Http\Controllers;

use App\GoodsReceipt;
use App\GoodsReceiptItem;
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
		$gr->GrStatusId = $request->input('GrStatusId');
		$gr->ReceivingDate = $request->input('ReceivingDate');
		//$gr->DocumentDate = 'GETDATE()';
		if($gr->save()){
			
			$items = $request->input('Items');
			//$items = json_decode($items);
			
			if(count($items) > 0){
				foreach($items as $item){
					$grItem = new GoodsReceiptItem();
					$grItem->DocEntry = $gr->GrId;
					
					if(!isset($item['ItemCode'])){
						$response['items_failed']['NoItemCode'][] = $item;
						continue;
					}
					
					if(!isset($item['ItemName'])){
						$response['items_failed']['NoItemName'][] = $item;
						continue;
					}
					
					$grItem->ItemCode = $item['ItemCode'];
					$grItem->ItemName = $item['ItemName'];
					$grItem->Specification = isset($item['Specification'])?$item['Specification']:'';
					$grItem->UnitPrice = isset($item['UnitPrice'])?$item['UnitPrice']:0.00;
					$grItem->Quantity = isset($item['Quantity'])?$item['Quantity']:0;
					$grItem->PlaceOfDelivery = isset($item['PlaceOfDelivery'])?$item['PlaceOfDelivery']:'';
					$grItem->UoM = isset($item['UoM'])?$item['UoM']:'';
					$grItem->SerialNo = isset($item['SerialNo'])?$item['SerialNo']:'';
					$grItem->AssetNo = isset($item['AssetNo'])?$item['AssetNo']:'';
					$grItem->PropertyCode =isset($item['PropertyCode'])?$item['PropertyCode']:'';
					$grItem->Warranty = isset($item['Warranty'])?$item['Warranty']:'';
					
					if($grItem->save()){
						$response['items_ok'][] = $grItem;
					}else{
						$response['items_failed'][] = $grItem;
					}
				}			
			}			
		
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
    public function show(Request $request, $id)
    {
        //$id = $request->input('id');
		$grObject = GoodsReceipt::query()
						->leftjoin('@STATUS as s', 's.ID', '=', '@GOODSRECEIPT.GrStatusId')
						->leftjoin('@OUSR as user','user.UserId','=','@GOODSRECEIPT.UserId')
						->whereColumn([
							['@GOODSRECEIPT.GrId','=',$id],
							['s.Name','=','Approved'],						
						])					
						->first([
							'@GOODSRECEIPT.*',
							's.NAME as GrStatus',
							'user.Name as UserName'
						]);
		
		if(is_object($grObject) && $grObject->GrId != null){
			$grObject->GrNo = 'GR-'.str_pad($grObject->GrId,7,'0',STR_PAD_LEFT);
			$grObject->items = GoodsReceiptItem::findByDocEntry($grObject->GrId);
		}else{
			$grObject = new \stdClass();
			$grObject->message = 'Not able to find any matching GR Document';
			$grObject->items = array();
		}
		
		return response()->json($grObject);
    }
	
	public function edit(Request $request, $id)
    {
        //$id = $request->input('id');
		$grObject = GoodsReceipt::query()
						->leftjoin('@STATUS as s', 's.ID', '=', '@GOODSRECEIPT.GrStatusId')
						->leftjoin('@OUSR as user','user.UserId','=','@GOODSRECEIPT.UserId')
						->where('@GOODSRECEIPT.GrId',$id)
						->first([
							'@GOODSRECEIPT.*',
							's.NAME as GrStatus',
							'user.Name as UserName'
						]);
		
		if(is_object($grObject) && $grObject->GrId != null){
			$grObject->GrNo = 'GR-'.str_pad($grObject->GrId,7,'0',STR_PAD_LEFT);
			$grObject->items = GoodsReceiptItem::findByDocEntry($grObject->GrId);
		}else{
			$grObject = new \stdClass();
			$grObject->message = 'Not able to find any matching GR Document';
			$grObject->items = array();
		}
		
		return response()->json($grObject);
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
