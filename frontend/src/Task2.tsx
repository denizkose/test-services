import { useEffect, useState } from "react";
import { addUsers, fetchUsers, removeUsers, resetUsersProblems } from "./api";

function Task2() {
  const [users, setUsers] = useState<number>(0);
  const [usersHadProblems, setUsersHadProblems] = useState<number>(0);

  const setFalse = async () => {
    const r = await resetUsersProblems();
    setUsersHadProblems(r.users);
  };

  const deleteUsers = async () => {
    const r = await removeUsers();
    console.log(r.result);
  };
  const createUsers = async () => {
    const r = await addUsers();
    console.log(r.result);
  };

  useEffect(() => {
    const getUsers = async () => {
      const u = await fetchUsers();
      setUsers(u.total);
    };

    getUsers();
  });

  return (
    <main className="container flex flex-col gap-6 px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">Task 2</h1>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-fit">
        <p className="mb-4 text-lg text-gray-700">User table is randomized</p>
        <div className="space-y-2 text-gray-600">
          <p className="flex justify-between">
            <span>Total users in DB:</span>
            <span className="font-semibold">{users}</span>
          </p>
          <p className="flex justify-between">
            <span>Users had problems:</span>
            <span className="font-semibold">{usersHadProblems}</span>
          </p>
        </div>
        <div className="mt-6 space-x-4">
          <button
            onClick={setFalse}
            className="px-6 py-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Set all users' problems to false
          </button>
          <button
            onClick={deleteUsers}
            className="px-6 py-2 text-white transition duration-300 bg-red-500 rounded-md hover:bg-red-600"
          >
            Remove all users
          </button>
          <button
            onClick={createUsers}
            className="px-6 py-2 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
          >
            Create 1M users
          </button>
        </div>
      </div>
    </main>
  );
}

export default Task2;
