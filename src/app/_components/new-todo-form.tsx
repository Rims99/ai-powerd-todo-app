
import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function NewToDoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTodo = useMutation(api.functions.createTodo);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTodo({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block text-lg font-semibold mb-2">Title</label>
      <input
        className="border p-2 mb-4 w-full"
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="block text-lg font-semibold mb-2">Description</label>
      <textarea
        className="border p-2 mb-4 w-full"
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
}
