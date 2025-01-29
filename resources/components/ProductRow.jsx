import axios from 'axios';
import { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';

const ProductRow = ({ product, isLast, handleDelete }) => {
  const [dataItemProduct, setDataItemProduct] = useState(product);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: dataItemProduct.name,
      description: dataItemProduct.description,
      price: dataItemProduct.price,
    },
  });

  useEffect(() => {
    if (isEdit) {
      reset(dataItemProduct);
    }
  }, [isEdit, reset, dataItemProduct]);

  const handleEditSubmit = async (data) => {
    try {
      const res = await axios.put(`/products/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        reset();
        setDataItemProduct(res.data.data.product);
        setIsEdit(false);
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

  return (
    <>
      {isEdit && (
        <div className="fixed h-screen w-screen left-0 top-0 z-9999 flex items-center justify-center bg-black bg-opacity-90">
          <div className="w-1/2 rounded bg-white p-4">
            <OutsideClickHandler onOutsideClick={() => setIsEdit(false)}>
              <form onSubmit={handleSubmit(handleEditSubmit)}>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex w-full justify-between items-center">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                      Edit Product
                    </h4>
                    <button
                      className="cursor-pointer"
                      onClick={() => setIsEdit(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M256-200l-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5 items-center">
                    <div className="w-full">
                      <label className="mb-3 block text-black dark:text-white">
                        Name Product
                      </label>
                      <input
                        type="text"
                        {...register('name', {
                          required: 'Name is required',
                        })}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-black dark:text-white">
                        Description
                      </label>
                      <input
                        type="text"
                        {...register('description', {
                          required: 'Description is required',
                        })}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      />
                      {errors.description && (
                        <p className="text-red-500">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-black dark:text-white">
                        Price
                      </label>
                      <input
                        type="number"
                        {...register('price', {
                          required: 'Price is required',
                        })}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      />
                      {errors.price && (
                        <p className="text-red-500">{errors.price.message}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-fit cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </OutsideClickHandler>
          </div>
        </div>
      )}

      {isDelete && (
        <div className="fixed h-screen w-screen left-0 top-0 z-9999 flex items-center justify-center bg-black bg-opacity-90">
          <div className="w-1/2 rounded bg-white p-4">
            <OutsideClickHandler onOutsideClick={() => setIsDelete(false)}>
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                  <button
                    type="button"
                    onClick={() => setIsDelete(false)}
                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="deleteModal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <svg
                    className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="mb-4 text-gray-500 dark:text-gray-300">
                    Are you sure you want to delete this item?
                  </p>
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      data-modal-toggle="deleteModal"
                      type="button"
                      onClick={() => setIsDelete(false)}
                      className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      No, cancel
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleDelete(dataItemProduct.id)}
                      className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Yes, I'm sure
                    </button>
                  </div>
                </div>
              </div>
            </OutsideClickHandler>
          </div>
        </div>
      )}

      <div
        className={`grid grid-cols-3 sm:grid-cols-5 ${
          isLast ? '' : 'border-b border-stroke dark:border-strokedark'
        }`}
      >
        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="text-black dark:text-white">{dataItemProduct.name}</p>
        </div>
        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="text-black dark:text-white">
            {dataItemProduct.description}
          </p>
        </div>
        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
          <p className="text-black dark:text-white">{dataItemProduct.price}</p>
        </div>
        <div className="flex items-center justify-center space-x-3.5">
          <button
            className="hover:text-primary hover:scale-150 transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
          <p>|</p>
          <button
            className="hover:text-red-600 text-red-300  hover:scale-150 transition-all"
            onClick={() => setIsDelete(true)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductRow;
