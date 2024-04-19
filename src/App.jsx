import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

// MEMO
const Container = styled.div`
  height: 100vh;
  width: 100vw;
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
  color: black;
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
  color: black;
`;

const Btn = styled.div`
  cursor: pointer;
`;

const Note = ({ note, onDelete }) => (
  <Draggable>
    <StyledNote>
      <NoteTitle>
        <div>MEMO</div>
        <Btn onClick={() => onDelete(note.id)}>X</Btn>
      </NoteTitle>
      <NoteContent defaultValue={note.content} />
    </StyledNote>
  </Draggable>
);

// TODO
const TodoWidget = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  color: white;
  padding: 10px;
  width: 250px; // 위젯의 너비를 조정하세요.
  font-family: 'Arial', sans-serif; // 원하는 글꼴로 변경하세요.
`;

const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const AddButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;

// 이 컴포넌트를 App 컴포넌트 내부에 렌더링해야 합니다.
const TodoInput = styled.input`
  padding: 5px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
`;

const Widget = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  border: white 1px solid;
  border-radius: 5px;
  color: white;
  padding: 10px;
  width: 300px;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const Input = styled.input`
  background: none;
  border: 1px solid white;
  //border: none;
  border-radius: 5px;
  color: black;
  padding: 5px;
  margin-right: 10px;
  outline: none;
  width: 100%;
  height: 20px;
  font-size: 14px;
`;

const Button = styled.div`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 25px;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  color: gray;
  font-size: 14px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  //background: white;
  accent-color: white;
`;

const EditableText = styled.span`
  flex-grow: 1;
  margin-right: 10px;
  &.completed {
    text-decoration: line-through;
  }
`;

const Todo = ({ todo, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <ListItem>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />
      {isEditing ? (
        <Input
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={e => e.key === 'Enter' && handleEdit()}
          autoFocus
        />
      ) : (
        <EditableText
          className={todo.completed ? 'completed' : ''}
          onClick={() => setIsEditing(true)}>
          {todo.text}
        </EditableText>
      )}
      <Button onClick={() => onDelete(todo.id)}>×</Button>
    </ListItem>
  );
};

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <Draggable>
      <Widget>
        <Header>
          <Input
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            placeholder="What's next?"
          />
          <Button onClick={addTodo}>+</Button>
        </Header>
        <List>
          {todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              onToggleComplete={toggleComplete}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </List>
      </Widget>
    </Draggable>
  );
};

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

  const deleteNote = id => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Container>
      <button onClick={addNote}>Add Note</button>
      {notes.map(note => (
        <Note key={note.id} note={note} onDelete={deleteNote} />
      ))}
      <TodoApp />
    </Container>
  );
}

export default App;
