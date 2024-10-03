import { useState, useEffect, useRef } from "react";
import Title from "./components/Title";

let id = 1;
export default function App() {
  const [point, setPoint] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const length = useRef(notes.length);

  const handleAdd = () => {
    const newArr = [...notes, { id: id, val: point }];
    setNotes(newArr);
    setPoint("");
    id++;
    length.current ++
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (id, value) => {
    setEditingId(id);
    setEditingValue(value);
  };

  const handleUpdate = () => {
    setNotes(
      notes.map((note) => (
        note.id === editingId ? { ...note, val: editingValue } : note
      ))
    );
    setEditingId(null);
    setEditingValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleKeyPress2 = (e) => {
    if (e.key === "Enter") {
      handleUpdate()
    }
  };

  useEffect(() => {
    if (point.length > 15) {
      alert("Max Characters");
    }
  });
  return (
    <div className="flex justify-center items-center flex-col content-center bg-yellow-100 min-h-screen selection:bg-black selection:text-white">
      <Title />
      <div className="bg-yellow-300 min-h-[80vh] max-w-[80vw] flex items-center flex-col rounded-xl container shadow-lg shadow-blue-400">
        <div className="flex mt-3">
          <input
            value={point}
            onChange={(e) => setPoint(e.target.value)}
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="Enter Task:"
            className="pl-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 border-2 border-emerald-400 text-black font-semibold"
          />
          <button
            onClick={handleAdd}
            className="ml-2 text-emerald-400 bg-stone-700 hover:bg-emerald-400 hover:text-neutral-50 rounded-md px-2 font-semibold border-solid border-2 border-emerald-400"
          >
            Add
          </button>
        </div>
        {length.current === 0 ? null : (
          <div className="bg-red-300 min-w-[50vw] mt-8 flex flex-col rounded-md font-bold">
            <ul className="list-decimal py-5 flex flex-col items-center space-y-4">
              {notes.map((note) => (
                <li key={note.id}>
                  {editingId === note.id ? (
                    <div>
                      <input
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        onKeyDown={handleKeyPress2}
                        className="pl-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 border-2 border-emerald-400 text-black font-semibold"
                      />
                      <button
                        onClick={handleUpdate}
                        className="bg-black text-white hover:bg-white hover:text-black rounded-md px-2 mx-4"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      {note.val}
                      <button
                        className="bg-black text-white hover:bg-white hover:text-black rounded-md px-2 mx-4"
                        onClick={() => handleEdit(note.id, note.val)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="bg-black text-white hover:bg-white hover:text-black rounded-md px-2"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
