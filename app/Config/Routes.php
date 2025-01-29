<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
// $routes->get('/', 'Home::index');
// $routes->get('/about', 'About::index');
// $routes->get('/profile', 'Profile::index');
// $routes->get('/dashboard', 'Dashboard::index');

service('auth')->routes($routes);

$routes->group("api", ['namespace' => 'App\Controllers\Api'], function ($routes) {
    // Invalid-access
    $routes->get('invalid-access', "AuthController::accessDenied");

    // Auth
    $routes->post('register', "AuthController::register");
    $routes->post('login', "AuthController::login");
    $routes->get('profile', "AuthController::profile", ["filter" => 'apiauth']);
    $routes->post('logout', "AuthController::logout", ["filter" => 'apiauth']);
});

// Products
$routes->get('/products', "ProductsController::allProducts", ["filter" => 'apiauth']);
$routes->get('/products/(:id)', "ProductsController::detailProduct", ["filter" => 'apiauth']);
$routes->post('/products', "ProductsController::addProduct", ["filter" => 'apiauth']);
$routes->put('/products/(:num)', "ProductsController::updateProduct/$1", ["filter" => 'apiauth']);
$routes->delete('/products/(:num)', "ProductsController::deleteProduct/$1", ["filter" => 'apiauth']);

$routes->get('/', "Dashboard::index", ["filter" => 'apiauth']);
