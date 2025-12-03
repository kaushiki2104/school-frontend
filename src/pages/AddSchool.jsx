import { useForm } from "react-hook-form";
import axios from "axios";

function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();

 
  const onSubmit = async (data) => {
  const formData = new FormData();

  for (const key in data) {
    if (key === "image") {
      formData.append("image", data.image[0]); // first file
    } else {
      formData.append(key, data[key]);
    }
  }

  await axios.post("http://localhost:5000/add-school", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  alert("School Added!");
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

        <input className="w-full border p-2 rounded" placeholder="City" {...register("city", { required: true })} />
        <input className="w-full border p-2 rounded" placeholder="State" {...register("state", { required: true })} />

        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Contact Number"
          {...register("contact", { required: true })}
        />

        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email ID"
          {...register("email_id", { required: true, pattern: /\S+@\S+\.\S+/ })}
        />

        <input type="file" {...register("image", { required: true })} />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddSchool;
