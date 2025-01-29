<?php

namespace App\Controllers;

class Dashboard extends BaseController
{
    public function index()
    {
        $data = [
            'pageTitle' => 'Dashboard',
            'userName' => 'John Doe',
            'notifications' => [
                ['id' => 1, 'message' => 'Welcome to the Dashboard'],
                ['id' => 2, 'message' => 'Your profile is incomplete']
            ],
        ];

        return view('welcome_message', ['data' => $data]);
    }
}
