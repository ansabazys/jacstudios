import React, { useState } from "react";
import { AccountSidebar } from "../../components/layout/Sidebar";
import Button from "../../components/common/Button";
import InputBox from "../../components/common/InputBox";
import useWidth from "../../hooks/useWidth";
import { useAuth } from "../../context/AuthContext";

const Account = () => {
  const width = useWidth();
  const { auth } = useAuth();


  const { data } = auth;

  console.log(data)
  const [formData, setFormData] = useState({
    name: data.name,
    email: data.email,
  });

  // const handleFormData =

  return (
    <div className="py-30 md:px-15 p-5 text-xs grid md:grid-cols-3">
      {width > 768 && <AccountSidebar ulClassName={"flex flex-col gap-1"} />}

      <div>
        <h1>ACCOUNT DETAILS</h1>
        <div>
          <p>Edit your preferences below.</p>
          <div className="flex w-full items-center  justify-center">
            <div className="h-full w-full  justify-center gap-5 items-start flex flex-col ">
              <h1 className="text-sm "></h1>
              <form action="" className="flex w-full flex-col gap-5 ">
                <InputBox
                  type="text"
                  placeholder="Name"
                  defaultValue={formData.name}
                />
                <InputBox type="email" placeholder="Email" defaultValue={formData.email}/>
                <div className="flex flex-col gap-3 pt-5">
                  <h1>New password</h1>
                  <InputBox
                    type="password"
                    name="current-password"
                    placeholder="Password"
                  />
                  <InputBox
                    type="password"
                    name="new-password"
                    placeholder="Confirm password"
                  />
                  <Button value="SAVE CHANGES" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
