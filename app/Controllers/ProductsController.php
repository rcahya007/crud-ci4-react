<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use App\Models\ProductModel;

class ProductsController extends ResourceController
{
    // All Products
    public function allProducts()
    {
        $user_id = auth()->id();
        $producstItem = new ProductModel();

        $producst = $producstItem->where([
            'user_id' => $user_id
        ])
            ->orderBy('id', 'DESC')
            ->findAll();

        $response = [
            'status' => true,
            'message' => 'All products',
            'data' => $producst,
        ];

        return $this->respond($response);
    }

    // Detail Product
    public function detailProduct($id) {}

    // Add Product
    public function addProduct()
    {
        $rules = [
            'name' => "required",
            'description' => "required",
            'price' => "required",
        ];

        if (!$this->validate($rules)) {
            $response = [
                'status' => false,
                'message' => $this->validator->getErrors(),
                'data' => [],
            ];
            return $this->respond($response, 400);
        } else {
            $user_id = auth()->id();

            $name = $this->request->getVar('name');
            $description = $this->request->getVar('description');
            $price = $this->request->getVar('price');

            $product = new ProductModel();
            $data = [
                'name' => $name,
                'description' => $description,
                'price' => $price,
                'user_id' => $user_id,
            ];

            if ($product->insert($data)) {
                $insertedId = $product->getInsertID();

                $insertedProduct = $product->find($insertedId);
                $response = [
                    'status' => true,
                    'message' => 'Product added successfully',
                    'data' => [
                        'product' => $insertedProduct,
                    ],
                ];
                return $this->respondCreated($response);
            } else {
                $response = [
                    'status' => false,
                    'message' => 'Failed to add product',
                    'data' => [],
                ];
                return $this->respond($response, 500);
            }
        }
    }

    // Update Product
    public function updateProduct($id)
    {
        // return $this->respond($id, 200);
        if (!empty($id)) {
            $rules = [
                'name' => "required",
                'description' => "required",
                'price' => "required",
            ];

            if (!$this->validate($rules)) {
                $response = [
                    'status' => false,
                    'message' => $this->validator->getErrors(),
                    'data' => [],
                ];
                return $this->respond($response, 400);
            } else {
                $product = new ProductModel();

                $product->update($id, [
                    'name' => $this->request->getVar('name'),
                    'description' => $this->request->getVar('description'),
                    'price' => $this->request->getVar('price'),
                ]);

                $updatedProduct = $product->find($id);
                $response = [
                    'status' => true,
                    'message' => 'Product updated successfully',
                    'data' => [
                        'product' => $updatedProduct,
                    ],
                ];
                return $this->respond($response);
            }
        } else {
            $response = [
                'status' => false,
                'message' => 'Product not found',
                'data' => [],
            ];
            return $this->respond($response, 404);
        }
    }

    // Delete Product
    public function deleteProduct($id)
    {
        $user_id = auth()->id();

        if (!empty($id)) {
            $product = new ProductModel();

            $product->where([
                'id' => $id,
                'user_id' => $user_id,
            ])->first();


            if (!empty($product)) {
                if ($product->delete($id)) {
                    $response = [
                        'status' => true,
                        'message' => 'Product deleted successfully',
                        'data' => [],
                    ];
                    return $this->respond($response);
                } else {
                    $response = [
                        'status' => false,
                        'message' => 'Failed to delete product',
                        'data' => [],
                    ];
                    return $this->respond($response, 500);
                }
            } else {
                $response = [
                    'status' => false,
                    'message' => 'Product not found',
                    'data' => [],
                ];
                return $this->respond($response, 404);
            }
        } else {
            $response = [
                'status' => false,
                'message' => 'Product not found',
                'data' => [],
            ];
            return $this->respond($response, 404);
        }
    }
}
