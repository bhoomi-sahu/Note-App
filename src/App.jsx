import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [heading, setHeading] = useState("");
  const [details, setDetails] = useState("");
  const [notes, setNotes] = useState([]);

  const isFirstRender = useRef(true);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!heading || !details) return;

    setNotes(prevNotes => [
      ...prevNotes,
      {
        id: Date.now(),
        heading,
        details,
      },
    ]);

    setHeading("");
    setDetails("");
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col lg:flex-row">

      <form
        onSubmit={submitHandler}
        className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col gap-6"
      >
        <input
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Enter Heading"
          className="px-5 py-2 border border-gray-500 rounded bg-transparent"
        />

        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Write Details"
          className="px-5 py-2 h-32 border border-gray-500 rounded bg-transparent"
        />

        <button className="bg-white text-black py-2 rounded font-semibold">
          Add Task
        </button>
      </form>

      <div className="w-full lg:w-1/2 p-6 sm:p-10">
        <h1 className="text-xl font-bold mb-4">Your Notes</h1>

        <div className="flex flex-wrap gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white text-black w-full sm:w-[45%] p-5 rounded-xl"
            >
              <h2 className="font-bold">{note.heading}</h2>
              <p>{note.details}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default App;



