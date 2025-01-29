<?php

namespace App\Controllers\Api;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\Shield\Models\UserModel;
use CodeIgniter\Shield\Entities\User;

class AuthController extends ResourceController
{
    // accessDenied
    public function accessDenied()
    {
        $response = [
            'status' => false,
            'message' => 'Invalid access',
            'data' => [],
        ];

        // Diarahkan ke view kembali
        // Diatur melalui frontend  
        // Diarahkan ke page sign-in
        return view('welcome_message', ['data' => $response]);
        // return $this->respond($response, 403);

        // Diarahkan ke page sign-in
        // Tidak masuk dalam routes karena route Frontend di dalam react
        // return redirect()->route('/sign-in');
    }

    // Register
    public function register()
    {
        $rules = [
            'username' => "required|is_unique[users.username]",
            'email' => "required|valid_email|is_unique[auth_identities.secret]",
            'password' => "required",
            'password_confirmation' => "required|matches[password]",
        ];

        if (!$this->validate($rules)) {
            $response = [
                'status' => false,
                'message' => $this->validator->getErrors(),
                'data' => [],
            ];
            return $this->respond($response, 400);
        } else {
            $userData = new UserModel();
            $userEntity = new User([
                'username' => $this->request->getVar('username'),
                'email' => $this->request->getVar('email'),
                'password' => $this->request->getVar('password'),
            ]);

            $userData->save($userEntity);
            $response = [
                'status' => true,
                'message' => 'User registered successfully',
                'data' => [],
            ];
            return $this->respondCreated($response);
        }
    }

    // Login
    public function login()
    {

        if (auth()->loggedIn()) {
            auth()->logout();
        }

        $rules = [
            'email' => "required|valid_email",
            'password' => 'required',
        ];

        // Wrong validation
        if (!$this->validate($rules)) {
            $response = [
                'status' => false,
                'message' => $this->validator->getErrors(),
                'data' => [],
            ];
            return $this->respond($response, 400);
        }

        // // Check auth
        // $auth = service('authentication');
        // // Hapus data sesi pengguna sebelumnya jika ada
        // if ($auth->check()) {
        //     $auth->logout(); // Logout pengguna sebelumnya
        // }

        // Next
        $credentials = [
            'email' => $this->request->getVar('email'),
            'password' => $this->request->getVar('password'),
        ];

        $loginAttempt = auth()->attempt($credentials);

        if ($loginAttempt->isOK()) {
            $userObject = new UserModel();
            $userData = $userObject->findById(auth()->id());
            $token = $userData->generateAccessToken("key_token");
            $user_token = $token->raw_token;

            $response = [
                'status' => true,
                'message' => 'User logged in successfully',
                'data' => [
                    'user' => $userData,
                    'token' => $user_token,
                ],
            ];
            return $this->respond($response);
        } else {
            $response = [
                'status' => false,
                'message' => 'Invalid credentials',
                'data' => [],
            ];
            return $this->respond($response, 400);
        }
    }

    // Profile
    public function profile()
    {
        $response = [
            'status' => true,
            'message' => 'User profile',
            'data' => [],
        ];
        return $this->respond($response);
    }

    // Logout
    public function logout()
    {
        auth()->logout();
        auth()->user()->revokeAllAccessTokens();

        $response = [
            'status' => true,
            'message' => 'User logged out successfully',
            'data' => [],
        ];
        return $this->respond($response);
    }
}
