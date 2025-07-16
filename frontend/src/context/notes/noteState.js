import React from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = React.useState(notesInitial);
  const host = "http://localhost:5000";

    // Get all notes

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgxYTQxODY1Y2YwMTBiMTUxNGUwMDU5In0sImlhdCI6MTc0NjU1NTMwNH0.2-_JZlJr93MfGT7s0Ek47jC9c8xOtQkI7EwPJUASWRU",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgxYTQxODY1Y2YwMTBiMTUxNGUwMDU5In0sImlhdCI6MTc0NjU1NTMwNH0.2-_JZlJr93MfGT7s0Ek47jC9c8xOtQkI7EwPJUASWRU",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note)); 
  };

  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgxYTQxODY1Y2YwMTBiMTUxNGUwMDU5In0sImlhdCI6MTc0NjU1NTMwNH0.2-_JZlJr93MfGT7s0Ek47jC9c8xOtQkI7EwPJUASWRU",
      },
    });
    const json = await response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgxYTQxODY1Y2YwMTBiMTUxNGUwMDU5In0sImlhdCI6MTc0NjU1NTMwNH0.2-_JZlJr93MfGT7s0Ek47jC9c8xOtQkI7EwPJUASWRU",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, title, description, tag };
      }
      return note;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, setNotes, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
