import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const Container = styled.div`
  height: 100vh;
  width:100vw;
  overflow: hidden;
  position: relative;
  background-image: url('../public/cloudImg.jpg'); 
  background-size: cover;
`;

const StyledNote = styled.div`
  position: absolute;
`;

const NoteTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 180px;
  height: 20px;
  border: white 1px solid;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.3);
  color:black;
`;

const NoteContent = styled.textarea`
  width: 180px;
  height: 140px;
  padding: 5px;
  font-size: 12px;
  resize: none;
  border: white 1px solid;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.35);
  outline: none;
  color:black;
`;

const Button = styled.div`
  cursor: pointer;
`;

const Note = ({ note, onDelete }) => (
  <Draggable>
    <StyledNote>
      <NoteTitle>
        <div>MEMO</div> 
      <Button onClick={() => onDelete(note.id)}>X</Button>
      </NoteTitle>
      <NoteContent defaultValue={note.content} />
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
