<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'username' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin12345'),
            'phone' => '0983294382',
            'address' => 'Live in Yangon',
            'role_id' => 1,
        ]);
        User::create([
            'username' => 'User',
            'email' => 'user@gmail.com',
            'password' => Hash::make('asdf12345'),
            'phone' => '0983294382',
            'address' => 'Live in Yangon',
            'role_id' => 2,
        ]);
    }
}
