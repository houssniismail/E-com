<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class AccountantController extends Controller
{
    public function index(){
        return Inertia::render('Accountant/Dashboard');
    }
}
