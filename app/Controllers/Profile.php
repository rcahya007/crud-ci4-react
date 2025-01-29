<?php

namespace App\Controllers;

class Profile extends BaseController
{
    public function index()
    {
        $data = [
            'pageTitle' => 'Profile',
            'description' => 'This is the Profile page of our application.',
        ];

        return view('welcome_message', ['data' => $data]);
    }
}
