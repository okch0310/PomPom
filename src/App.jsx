import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const Container = styled.div`
  height: 100vh;
  background: #f0f0f0;
  overflow: hidden;
  position: relative;
`;

const StyledNote = styled.div`
  background: #ffeb3b;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  width: 200px;
  height: 200px;
  padding: 10px;
  margin: 10px;
  overflow: hidden;
  position: absolute;
`;

const NoteTitle = styled.input`
  width: calc(100% - 20px);
  border: none;
  padding: 5px;
  margin-bottom: 5px;
  font-size: 14px;
`;

const NoteContent = styled.textarea`
  width: calc(100% - 20px);
  height: 140px;
  border: none;
  padding: 5px;
  font-size: 12px;
  resize: none;
`;

const Note = ({ note, onDelete }) => (
  <Draggable>
    <StyledNote>
      <NoteTitle placeholder="Untitled" defaultValue={note.title} />
      <NoteContent defaultValue={note.content} />
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </StyledNote>
  </Draggable>
);

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: '',
      content: '',
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Container>
      <button onClick={addNote}>Add Note</button>
      {notes.map(note => (
        <Note key={note.id} note={note} onDelete={deleteNote} />
      ))}
    </Container>
  );
}

export default App;
