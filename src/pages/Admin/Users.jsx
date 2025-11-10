import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getUsers, updateUser } from "../../api/user";

const Users = () => {
  const columns = ["name", "email", "time", "status", "actions"];

  const [users, setUsers] = useState([]);

  const handleUpdate = async (id, status) => {
    let update = status == "active" ? "inactive" : "active";

    const [data, err] = await updateUser(id, { status: update });
    console.log(data);
    if (data) {
      fetchUsers();
      toast("User updated successfully", { autoClose: 1000 });
    }
  };

  const fetchUsers = async () => {
    const [data, err] = await getUsers();
    if (data) setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

  return (
    <div className="p-5">
      <div className="flex w-full justify-between ">
        <h1>Users</h1>
        <button onClick={() => setIsOpen((prev) => !prev)}>add</button>
      </div>

      <div className="mt-10 ">
        <table className="w-full">
          <thead>
            <tr className="grid border-black/20 grid-cols-5  border-x border-t p-5 border-b place-items-center">
              {columns.map((col, key) => (
                <th key={key}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((data) => (
              <tr
                key={data._id}
                className="grid border-b border-black/20 border-x grid-cols-5 p-5 place-items-center"
              >
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.createdAt}</td>
                <td>{data.status}</td>

                <td className="flex gap-5">
                  <button
                    onClick={() => handleUpdate(data._id, data.status)}
                    className="border px-5 rounded-sm border-yellow-400"
                  >
                    {data.status == "active" ? "deactivate" : "activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Users;
