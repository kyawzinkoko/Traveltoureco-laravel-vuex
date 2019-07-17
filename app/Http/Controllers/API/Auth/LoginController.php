<?php

namespace App\Http\Controllers\API\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use DB;
use App\User;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // dd(request()->all());
        $this->validate($request, $this->rules(), $this->messages());

        $user = User::whereEmail($request->email)->first();

        // Send an internal API request to get an access token
        $client = DB::table('oauth_clients')
            ->where('password_client', true)
            ->first();

        // Make sure a Password Client exists in the DB
        if (!$client) {
            return response()->json([
                'message' => 'Laravel Passport is not setup properly.',
                'status' => 500
            ], 500);
        }

        $token_generate = Request::create('/oauth/token', 'POST', [
            'grant_type' => 'password',
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'username' => $request->email,
            'password' => $request->password,
        ]);

        $response = app()->handle($token_generate);

        $data = json_decode($response->getContent());
        // dd($data);

        return response()->json([
            'token' => $data->access_token,
            'user' => $user,
            'status' => 200
        ]);
    }

    public function logout()
    {
        // dd(auth()->user()->token());
        $accessToken = auth()->user()->token();

        // dd($accessToken);

        $refreshToken = DB::table('oauth_refresh_tokens')->where('access_token_id', $accessToken->id)->delete();

        $accessToken->revoke();

        return response()->json(['status' => 200]);
    }


    public function getUser()
    {
        // dd(auth()->user());
        return auth()->user();
    }

    protected function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ];
    }
    protected function messages()
    {
        return [];
    }
}
