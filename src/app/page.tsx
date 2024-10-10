"use client";
import { useState } from "react";
import { NewToDoForm } from "./_components/new-todo-form";
import { useMutation, useQuery } from "convex/react";
import { api } from "..//../convex/_generated/api";
import { title } from "process";
import {Id} from "../../convex/_generated/dataModel";

export default function Home() {  
  const todos = useQuery(api.functions.listTodos);

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">TO-DO LIST APP</h1>
      <ul className="space-y-2">
        {todos?.map(({ _id, title, description, completed }, index) => (
          <ToDoItem
            key={index}
            id={_id}
            title={title}
            description={description}
            completed={completed}
          />
        ))}
      </ul>
      <NewToDoForm />
    </div>
  );
  
function ToDoItem({id,title,description,completed}:{
  id: Id<"todos">;
  title:string,
  description:string,
  completed:boolean;
}){
  const updateTodo = useMutation(api.functions.updateTodo);
  const deleteTodo = useMutation(api.functions.deleteTodo);
  return (
    <li className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={completed}
        onChange={e => updateTodo({ id, completed: e.target.checked })}
      />
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-gray-500">{description}</p>
      </div>
      <div className="ml-auto">
        <button type="button" className="text-red-500" onClick={()=> deleteTodo({id})}>Remove</button>
      </div>
    </li>
  );
}
}