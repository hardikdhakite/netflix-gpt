import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    async function checkUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      getTodos();
    }

    async function getTodos() {

      const { data: todos, error } = await supabase
        .from("todos")
        .select("*");

      if (error) {
        console.log(error);
        return;
      }

      if (todos) {
        setTodos(todos);
      }
    }

    checkUser();

  }, []);

  const handleLogout = async () => {

    await supabase.auth.signOut();

    navigate("/");
  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Browse Page
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Logout
        </button>

      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="mb-2"
          >
            {todo.name}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Browse;