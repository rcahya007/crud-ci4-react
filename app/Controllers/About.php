<?php

namespace App\Controllers;

class About extends BaseController
{
    public function index()
    {
        $data = [
            'pageTitle' => 'About Us',
            'description' => 'This is the About page of our application.',
        ];

        return view('welcome_message', ['data' => $data]);
    }
}
