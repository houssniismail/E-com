<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Inertia::render('Category/Index',['categories' => Category::with(['products'=>fn ($products)=>$products->chaperone()])->get()]);
        return Inertia::render('Category/Index', [
            'categories' => Category::with('products')->get(),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Category/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validationCategoryData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        } else {
            $imagePath = null;
        }

        $product = new Category();
        $product->name = $validationCategoryData['name'];
        $product->image = $imagePath;
        $product->save();
        return redirect()->back()->with('success', 'Product added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Category/Show', ['id' => $id]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Category/Edit', ['id' => $id]);
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
    public function destroy(string $id): Response
    {
        $category = Category::find($id);
        if ($category === null) {
            return response(
                "Category with id {$id} not found",
                Response::HTTP_NOT_FOUND
            );
        }

        if ($category->delete() === false) {
            return response(
                "Couldn't delete the category with id {$id}",
                Response::HTTP_BAD_REQUEST
            );
        }
        return response(["id" => $id, "deleted" => true], Response::HTTP_OK);
    }
}
