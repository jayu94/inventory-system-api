<?php

namespace App\Http\Controllers;

use App\IssuanceAcceptance;
use App\IssuanceAcceptanceItem;
use Illuminate\Http\Request;

class IssuanceAcceptanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
		$items = IssuanceAcceptance::all();
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
        $issuance = new IssuanceAcceptance();
		$issuance->UserID = $request->input('UserID');
		$issuance->PONo = $request->input('PONo');		
		$issuance->MIFRRGRNo = $request->input('MIFRRGRNo');
		$issuance->StatusID = $request->input('StatusID');
		$issuance->IssuanceID = $request->input('GiNo');
		$issuance->IssuanceAcceptanceDate = date('Y-m-d H:i:s');
		if($issuance->save()){
			$items = $request->input('Items');
			//$items = json_decode($items);
			
			if(count($items) > 0){
				foreach($items as $item){
					$iiItem = new IssuanceAcceptanceItem();
					$iiItem->IssuanceAcceptanceID = $issuance->IssuanceAcceptanceID;
					
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
			$response['IssuanceAcceptance'] = $issuance;
		
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
    public function show(Request $request, $id)
    {
        //
		$grObject = IssuanceAcceptance::query()
						->leftjoin('@STATUS as s', 's.ID', '=', '@ISSUANCE.StatusId')
						->leftjoin('@OUSR as user','user.UserId','=','@ISSUANCE.UserId')
						->whereColumn([
							['@ISSUANCE.IssuanceId','=',$id]							
						])					
						->first([
							'@ISSUANCEACCEPTANCE.*',
							's.NAME as Status',
							'user.Name as UserName'
						]);
		
		if(is_object($grObject) && $grObject->IssuanceAcceptanceID != null){
			$grObject->IANo = 'IA-'.str_pad($grObject->IssuanceAcceptanceID,7,'0',STR_PAD_LEFT);
			$grObject->items = IssuanceAcceptanceItem::findByIssuanceAcceptanceID($grObject->IssuanceAcceptanceID);
		}else{
			$grObject = new \stdClass();
			$grObject->message = 'Not able to find any matching GR Document';
			$grObject->items = array();
		}
		
		return response()->json($grObject);
    }
	
	/**
     * Copy 
     *
     * @param  \App\Issuance  $issuance
     * @return \Illuminate\Http\Response
     */
	public function copy(Request $request, $id)
    {
        
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
    public function destroy($IssuanceID)
    {
        //
		$gr = IssuanceAcceptance::find($IssuanceID);
		if($gr->delete()){
			$items = IssuanceAcceptance::findByIssuanceAcceptanceID($IssuanceID);
			foreach($items as $item){
				$itemObject = IssuanceAcceptanceItem::find($item->EntryID);
				$itemObject->delete();
			}
			$response['status'] = 'ok';
		}else{
			$response['status'] = 'failed';
		}
		return response()->json($response);
    }
	
	public function decide(Request $request){
		$entryID = $request->input('EntryID');
		$decision = $request->input('Decision');
		
		$response = array();
		
		$item = IssuanceAcceptanceItem::find($entryID);
		$item->Decision = $decision;
		$item->DecisionDate = date('Y-m-d H:i:s');
		if($item->save()){
			$response['status'] = 'ok';
			$response['item'] = $item;
		}else{
			$response['status'] = 'failed';
		}
		
		return response()->json($response);
	}
}
