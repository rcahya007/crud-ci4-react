import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductRow from '../ProductRow';

const TableOne = ({ name = 'Table One' }) => {
  const location = useLocation();
  const data = location.state;
  const [products, setProducts] = useState(data?.data ?? []);
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const handleAddProduct = async (data) => {
    try {
      const response = await axios.post('/products', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        setProducts((prev) => [response.data.data.product, ...prev]);
        reset();
        setOpenModal(false);
      }
    } catch (e) {
      toast.error('Error!');
      if (e.response && e.response.data.message) {
        const backendErrors = e.response.data.message;
        if (backendErrors.name) {
          setError('name', {
            type: 'manual',
            message: backendErrors.name,
          });
        }
        if (backendErrors.description) {
          setError('description', {
            type: 'manual',
            message: backendErrors.description,
          });
        }
        if (backendErrors.price) {
          setError('price', {
            type: 'manual',
            message: backendErrors.price,
          });
        }
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setProducts((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      toast.error('Error!');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between gap-4 mb-5">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {name}
        </h4>
        <button
          className="rounded-md bg-primary py-2 px-4 text-white"
          onClick={() => setOpenModal(true)}
        >
          Add Product
        </button>
      </div>

      {openModal && (
        <div className="fixed h-screen w-screen left-0 top-0 z-9999 flex items-center justify-center bg-black bg-opacity-90">
          <div className="w-1/2 rounded bg-white p-4">
            <OutsideClickHandler onOutsideClick={() => setOpenModal(false)}>
              <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex w-full justify-between items-center">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                      Product
                    </h4>
                    <button
                      className="cursor-pointer"
                      onClick={() => setOpenModal(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Name Product
                      </label>
                      <input
                        type="text"
                        {...register('name', {
                          required: 'Name is required',
                        })}
                        placeholder="Name Input"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Description Product
                      </label>
                      <input
                        type="text"
                        placeholder="Description Input"
                        {...register('description', {
                          required: 'Description is required',
                        })}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.description && (
                        <p className="text-red-500">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Price Product
                      </label>
                      <input
                        type="number"
                        {...register('price', {
                          required: 'Price is required',
                        })}
                        placeholder="Price Input"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.price && (
                        <p className="text-red-500">{errors.price.message}</p>
                      )}
                    </div>
                    <div className="mb-5 flex justify-center items-center">
                      <button
                        type="submit"
                        className="w-fit cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </OutsideClickHandler>
          </div>
        </div>
      )}

      {products.length > 0 ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name Product
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Description
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Price
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              isLast={products.length - 1}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-xl font-semibold text-gray-700 text-center mt-10 mb-4">
          No products found
        </h1>
      )}
    </div>
  );
};

export default TableOne;
