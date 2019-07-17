<?php

namespace App\Http\Controllers\API\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Hash;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, $this->rules(), $this->messages());

        $this->create($request->all());

        return (new LoginController)->login($request);
    }

    protected function create($data)
    {
        return User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
    protected function rules()
    {
        return [
            'username' => 'required|string|max:50',
            'email' => 'required|string|email|max:50|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ];
    }
    protected function messages()
    {
        return [];
    }
}
