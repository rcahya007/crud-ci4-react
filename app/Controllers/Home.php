<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
        $data = [
            'pageTitle' => 'Home',
            'userName' => 'John Doe',
            'notifications' => [
                ['id' => 1, 'message' => 'Welcome to the Home'],
                ['id' => 2, 'message' => 'Your profile is incomplete']
            ],
        ];

        return view('welcome_message', ['data' => $data]);
    }
}
