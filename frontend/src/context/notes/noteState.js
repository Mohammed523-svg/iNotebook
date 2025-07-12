import React from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
  {
    "_id": "68727f3e7b95aa11479c701e",
    "user": "681a41865cf010b1514e0059",
    "title": "hello",
    "description": "go ula ula",
    "tag": "personal",
    "date": "2025-07-12T15:29:02.635Z",
    "__v": 0
  },
  {
    "_id": "68727f6b7b95aa11479c7022",
    "user": "681a41865cf010b1514e0059",
    "title": "hello",
    "description": "go ula ula ula",
    "tag": "personal",
    "date": "2025-07-12T15:29:47.719Z",
    "__v": 0
  },
    {
    "_id": "68727f3e7b95aa11479c701e",
    "user": "681a41865cf010b1514e0059",
    "title": "hello",
    "description": "go ula ula",
    "tag": "personal",
    "date": "2025-07-12T15:29:02.635Z",
    "__v": 0
  },
  {
    "_id": "68727f6b7b95aa11479c7022",
    "user": "681a41865cf010b1514e0059",
    "title": "hello",
    "description": "go ula ula ula",
    "tag": "personal",
    "date": "2025-07-12T15:29:47.719Z",
    "__v": 0
  },
    {
    "_id": "68727f3e7b95aa11479c701e",
    "user": "681a41865cf010b1514e0059",
    "title": "hello",
    "description": "go ula ula",
    "tag": "personal",
    "date": "2025-07-12T15:29:02.635Z",
    "__v": 0
  },
  {
    "_id": "68727f6b7b95aa11479c7022",
    "user": "681a41865cf010b1514e0059",
    "title": "hello",
    "description": "go ula ula ula",
    "tag": "personal",
    "date": "2025-07-12T15:29:47.719Z",
    "__v": 0
  },
    {
    "_id": "68727f3e7b95aa11479c701e",
    "user": "681a41865cf010b1514e0059",
    "title": "hello",
    "description": "go ula ula",
    "tag": "personal",
    "date": "2025-07-12T15:29:02.635Z",
    "__v": 0
  },
  {
    "_id": "68727f6b7b95aa11479c7022",
    "user": "681a41865cf010b1514e0059",
    "title": "hello",
    "description": "go ula ula ula",
    "tag": "personal",
    "date": "2025-07-12T15:29:47.719Z",
    "__v": 0
  },
    ]

    const [notes, setNotes] = React.useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;