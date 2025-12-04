import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AddSchool() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };


 const onSubmit = async (data) => {
    console.log("data.image:", data.image);
    const formData = new FormData();
    console.log("submit clikc");
    formData.append("image", data.image[0]);


    Object.keys(data).forEach((key) => {
      if (key !== "image") formData.append(key, data[key]);
    });



    try {
      const responsePromise = axios.post(
        "https://school-backend-4vxa.onrender.com/add-school",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.promise(responsePromise, {
        loading: "Saving...",
        success: (res) => <b>{res.data?.message || "School saved!"}</b>,
        error: (err) => (
          <b>{err.response?.data?.message || "Could not save the school."}</b>
        ),
      });

      await responsePromise;

      reset();
      setSelectedFiles([]);

    } catch (err) {
      console.log('error', err);

    }
  };

  return (

    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded mt-2">
      <h1 className="text-2xl font-semibold mb-4">Add School</h1>


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        <input
          className="w-full border p-2 rounded"
          placeholder="School Name"
          {...register("name", { required: true })}
        />
        {errors.name && <p className="text-red-500 text-sm">Required</p>}

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Address"
          {...register("address", { required: true })}
        />
        {errors.address && <p className="text-red-500 text-sm">Required</p>}

        <input className="w-full border p-2 rounded" placeholder="City" {...register("city", { required: true })} />
        {errors.city && <p className="text-red-500 text-sm">Required</p>}

        <input className="w-full border p-2 rounded" placeholder="State" {...register("state", { required: true })} />
        {errors.state && <p className="text-red-500 text-sm">Required</p>}

        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Contact Number"
          {...register("contact", { required: true })}
        />
        {errors.contact && <p className="text-red-500 text-sm">Required</p>}

        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email ID"
          {...register("email_id", { required: true, pattern: /\S+@\S+\.\S+/ })}
        />
        {errors.email_id && <p className="text-red-500 text-sm">Required</p>}



        <div
          className="flex flex-col items-center justify-center border-2 border-dotted border-blue-300 p-10 text-center rounded-lg bg-blue-50 cursor-pointer hover:bg-blue-100 transition duration-300"
          onClick={triggerFileInput}
        >
          <div className="flex items-center justify-center w-24 h-24 bg-white rounded-full mb-3">
            <img
              src={'/gallery-icon.svg'}
              alt="Upload Icon"
              className="w-16 h-16"
            />
          </div>

          {selectedFiles.length == 0 ? (
            <>
              <p className="font-bold mb-1">Drag and drop image file to upload</p>
              <p className="text-gray-500 mb-0">
                or{" "}
                <span className="border-b font-bold">Click to browse</span> (10 mb max)
              </p>
            </>
          ) : (
            <p>{selectedFiles?.name} </p>
          )}


          <input
            type="file"
            {...register("image", { required: true })}
            ref={(e) => {
              register("image").ref(e);
              fileInputRef.current = e;
            }}
            className="hidden"
            accept=".png, .jpg, .jpeg,"
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedFiles(file || null);     
              register("image").onChange(e);      
            }}
          />
          {errors.image && <p className="text-red-500 text-sm">Required</p>}
         
        </div>










        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddSchool;
