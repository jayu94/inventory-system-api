<?php

namespace App\Http\Controllers;

use App\Issuance;
use App\IssuanceItem;
use Illuminate\Http\Request;

class IssuanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
		$items = Issuance::all();
		return response()->json($items);
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
        $issuance = new Issuance();
		$issuance->UserID = $request->input('UserID');
		$issuance->RequestingUserID = $request->input('RequestingUserID');
		$issuance->RequestingUserDepartment = $request->input('RequestingUserDepartment');
		$issuance->MIFRRGRNo = $request->input('MIFRRGRNo');
		$issuance->StatusID = $request->input('StatusID');
		if($issuance->save()){
			$items = $request->input('Items');
			//$items = json_decode($items);
			
			if(count($items) > 0){
				foreach($items as $item){
					$iiItem = new IssuanceItem();
					$iiItem->IssuanceID = $issuance->IssuanceID;
					
					if(!isset($item['ItemCode'])){
						$response['items_failed']['NoItemCode'][] = $item;
						continue;
					}
					
					if(!isset($item['ItemName'])){
						$response['items_failed']['NoItemName'][] = $item;
						continue;
					}
					
					$iiItem->ItemCode = $item['ItemCode'];					
					$iiItem->UnitPrice = isset($item['UnitPrice'])?$item['UnitPrice']:0.00;
					$iiItem->Quantity = isset($item['Quantity'])?$item['Quantity']:0;
					$iiItem->PlaceOfDelivery = isset($item['PlaceOfDelivery'])?$item['PlaceOfDelivery']:'';
					$iiItem->Specification = isset($item['Specification'])?$item['Specification']:'';
					$iiItem->ItemName = $item['ItemName'];			
					$iiItem->UoM = isset($item['UoM'])?$item['UoM']:'';
					$iiItem->SerialNo = isset($item['SerialNo'])?$item['SerialNo']:'';
					$iiItem->PropertyCode =isset($item['PropertyCode'])?$item['PropertyCode']:'';
					$iiItem->OriginalAssignee = isset($item['OriginalAssignee'])?$item['OriginalAssignee']:0;
					$iiItem->ActualAssignee = isset($item['ActualAssignee'])?$item['ActualAssignee']:0;					
					$iiItem->CostCenter = isset($item['CostCenter'])?$item['CostCenter']:'';
					$iiItem->Purpose = isset($item['Purpose'])?$item['Purpose']:'';
					$iiItem->Amount = isset($item['Amount'])?$item['Amount']:0.00;
					
					
					if($iiItem->save()){
						$response['items_ok'][] = $iiItem;
					}else{
						$response['items_failed'][] = $iiItem;
					}
				}			
			}
			
			$response['status'] = 'ok';
			$response['Issuance'] = $issuance;
		
		}else{
			$response['status'] = 'failed';
		}
		return response()->json($issuance);
		
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Issuance  $issuance
     * @return \Illuminate\Http\Response
     */
    public function show(Issuance $issuance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Issuance  $issuance
     * @return \Illuminate\Http\Response
     */
    public function edit(Issuance $issuance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Issuance  $issuance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Issuance $issuance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Issuance  $issuance
     * @return \Illuminate\Http\Response
     */
    public function destroy(Issuance $issuance)
    {
        //
    }
}
