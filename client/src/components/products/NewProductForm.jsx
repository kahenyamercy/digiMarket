import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import ErrorMessage from "../utilComponents/ErrorMessage";
import LoadingSpinner from "../utilComponents/LoadingSpinner";
import { createProduct, listUserProducts } from "../../redux/actions/productActions";
import { listCategories } from "../../redux/actions/categoryActions";
import { resetProductState } from "../../redux/slices/productSlices";
import { toast } from "react-toastify";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const NewProductForm = () => {
  const dispatch = useDispatch();
  const bucket_url = process.env.REACT_APP_BUCKET_URL;

  const { loading, error, success } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    unit: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadErr, setUploadErr] = useState(null);
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleCategories = (e) => {
    setCategories([...categories, e.target.value]);
  };

  const uploadImages = async () => {
    try {
      const uploadPromises = images.map((image) => {
        const fileName = new Date().getTime() + image.name;
        const storage = getStorage(app, bucket_url);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              console.log(progress);
            },
            reject, // Error handler
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setUrls(uploadedUrls);
      return uploadedUrls;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadLoading(true);
    setUploadErr(null);
    try {
      // Wait for all images to be uploaded
      const uploadedUrls = await uploadImages();
      dispatch(
        createProduct({ ...productData, image: uploadedUrls[0], categories })
      );
      setUploadLoading(false);
    } catch (error) {
      setUploadLoading(false);
      setUploadErr(error);
    }
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (success || error){
      setProductData({
        name: "",
        price: "",
        unit: "",
        description: "",
      });
      setUrls([]);
      setCategories([]);
    }
  }, [success, error])

  useEffect(() => {
    if (success){
      toast.success("Your order has been placed successfully!", ToastObjects);
      dispatch(listUserProducts());
      dispatch(resetProductState());
    }
  }, [success, dispatch])

  return (
    <form className='w-full border rounded p-4' onSubmit={handleSubmit}>
      <h6 className='text-gray-600 font-semibold italic'>New Product</h6>
      {uploadLoading || loading ? (
        <LoadingSpinner />
      ) : (
        uploadErr ||
        (error && <ErrorMessage>{uploadErr || error}</ErrorMessage>)
      )}
      <div className='grid md:grid-cols-9 flex gap-2'>
        <div className='col-span-1 md:col-span-3 mt-2'>
          <label
            htmlFor='product_name'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Product Name
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
              <input
                type='text'
                name='name'
                value={productData.name}
                onChange={handleChange}
                id='product_name'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
        </div>
        <div className='col-span-1 md:col-span-3 mt-2'>
          <label
            htmlFor='product_price'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Price
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
              <input
                type='number'
                name='price'
                value={productData.price}
                onChange={handleChange}
                id='product_price'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
        </div>
        <div className='col-span-1 md:col-span-3 mt-2'>
          <label
            htmlFor='unit'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Unit (In words)
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
              <input
                type='text'
                name='unit'
                value={productData.unit}
                onChange={handleChange}
                id='unit'
                placeholder='eg. 1Kg, 70Kg bag, 1 tonne vehicle etc.'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='grid md:grid-cols-9 flex gap-2'>
        <div className='col-span-1 md:col-span-3 mt-2'>
          <label
            htmlFor='description'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Description
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
              <textarea
                name='description'
                rows={5}
                value={productData.description}
                onChange={handleChange}
                id='description'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6'
              ></textarea>
            </div>
          </div>
        </div>
        <div className='col-span-1 md:col-span-3 mt-2'>
          <h6 className='block text-sm font-medium leading-6 text-gray-900'>
            Categories (Up to 3 categories)
          </h6>
          <select
            className='w-full px-4 py-2 rounded my-2'
            onChange={handleCategories}
          >
            <option>--select category 1--</option>
            {categoryList?.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <select
            className='w-full px-4 py-2 rounded my-2'
            onChange={handleCategories}
          >
            <option>--select category 2--</option>
            {categoryList?.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <select
            className='w-full px-4 py-2 rounded my-2'
            onChange={handleCategories}
          >
            <option>--select category 3--</option>
            {categoryList?.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className='col-span-1 md:col-span-3 mt-2'>
          <div className=''>
            <label
              htmlFor='new_image'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Product Images
            </label>
            <div className='mt-2'>
              <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                <input
                  type='file'
                  multiple
                  name='image'
                  onChange={handleImages}
                  id='new_image'
                  className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
          <div className='w-full mt-3 grid grid-cols-1 md:grid-cols-3'>
            {urls?.map((url) => {
              return (
                <img
                  src={url}
                  className='col-span-1 h-28 object-cover'
                  alt='product'
                />
              );
            })}
          </div>
        </div>
      </div>
      <button
        type='submit'
        className='w-72 bg-lime-400 text-white px-4 py-1 rounded my-3'
      >
        Create Product
      </button>
    </form>
  );
};

export default NewProductForm;
