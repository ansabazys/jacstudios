import React from "react";
import InputBox from "./InputBox";
import Button from "./Button";

const PopUpModel = ({ setFormData, formData, handleSubmit, setIsOpen }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className=" w-full  flex absolute left-0 justify-center">
      <div className=" w-full bg-white p-5 border max-w-lg flex flex-col gap-5">
        <div className="w-full flex justify-end">
          <button
            className="text-xs"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            CLOSE
          </button>
        </div>
        <div className="">
          <InputBox
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="">Description</label>
          <textarea
            className="border w-full p-2"
            rows={5}
            name="description"
            id=""
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <Button
          value={formData.id ? "Edit" : "Continue"}
          onClick={() => handleSubmit(formData.id)}
        />
      </div>
    </div>
  );
};

export default PopUpModel;
