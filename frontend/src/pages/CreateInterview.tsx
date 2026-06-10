import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateInterview, startInterview } from "../api/interviewApi";

function CreateInterview() {
  const navigate = useNavigate();

  const [category, setCategory] =
    useState("Программирование на С#");

  const [difficulty] =
    useState(10);

  const createInterview = async () => {

    const interviewId = await generateInterview(category, difficulty);
    await startInterview(interviewId);
    navigate(
      `/interview/${interviewId}`
    );
  };

  return (
    <div className="p-8">

      <h1 className="text-2xl mb-4">
        New Interview
      </h1>

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option>Программирование на С#</option>
        <option>React</option>
        <option>Java</option>
      </select>

      <button
        onClick={createInterview}
        className="ml-4 bg-black text-white px-4 py-2"
      >
        Create
      </button>
    </div>
  );
}

export default CreateInterview;