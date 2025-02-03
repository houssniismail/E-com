<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Sale;
use App\Models\UserSale;
use App\Models\SaleProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'qty' => 'required|numeric|min:1',
            'size' => 'required|string|max:255',
            'product_id' => 'required|exists:products,id',
        ]);

        
        $existingSale = UserSale::whereHas('sale.saleProducts', function ($query) use ($validatedData) {
            $query->where('product_id', $validatedData['product_id'])
                ->where('size', $validatedData['size']);
        })
            ->whereHas('sale', function ($query) {
                $query->where('user_id', Auth::id());
            })
            ->first();



        if ($existingSale) {
            $existingSale->sale->qty += $validatedData['qty'];
            $existingSale->sale->save();

            return redirect()->back()->with('success', 'Sale quantity updated successfully!');
        } else {
            $sale = Sale::create([
                'qty' => $validatedData['qty'],
                'size' => $validatedData['size'],
            ]);

            UserSale::create([
                'user_id' => Auth::id(),
                'sale_id' => $sale->id,
            ]);

            SaleProduct::create([
                'sale_id' => $sale->id,
                'product_id' => $validatedData['product_id'],
                // 'qty' => $validatedData['qty'], 
            ]);

            return redirect()->back()->with('success', 'Sale added successfully!');
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $sale = Sale::find($id);

        if (!$sale) {
            return response()->json(['message' => 'Sale not found'], 404);
        }

        $sale->products()->detach();

        $sale->delete();

        return response()->json(['message' => 'Sale deleted successfully']);
    }

}
