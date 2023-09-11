import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, editTodo } from '../redux/slices/todoSlice';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 550px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f9;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

 
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  
`;

const Text = styled.span`
  font-size: 18px;
  font-weight: 600;
  text-decoration: ${({ done }) => (done ? 'line-through' : 'none')};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ToggleButton = styled.button`
  background-color: ${({ done }) => (done ? 'green' : '#426182')};
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #fff;

  
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  `;

const EditButton = styled.button`
  background-color: #edd03e;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 7px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;

 `;
const Watermark = styled.div`
  position: absolute;
  bottom: 10px;
  left: 90%;
  font-size: 14px;
  color: #000;
  font-weight:600;
  
  
  
`;
const Number = styled.span`
font-size:18px;
font-weight:700;
`;


const TodoApp = () => {
  const [inputText, setInputText] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList);

  const addTodoItem = () => {
    if (inputText.trim() === '') {
      alert('დაამატე რამე :)');
    } else {
      dispatch(addTodo(inputText));
      setInputText('');
    }
  };
  

  const toggleTodoItem = (index) => {
    dispatch(toggleTodo(index));
  };

  const deleteTodoItem = (index) => {
    dispatch(deleteTodo(index));
  };

  const editTodoItem = (index, newText) => {
    setEditIndex(index);
    setInputText(newText);
  };

  const saveEditedTodo = (index) => {
    if (inputText.trim() !== '') {
      dispatch(editTodo({ index, newText: inputText })); 
      setEditIndex(-1);
      setInputText('');
    }
  };
  

  return (
    <Container>
      <Title>My To-Do List</Title>
      <InputContainer>
        <Input
          type="text"
          placeholder="დაამატე..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <AddButton onClick={addTodoItem}>Add</AddButton>
      </InputContainer>
      <TodoList>
        {todoList.map((todo, index) => (
          <TodoItem key={index} done={todo.done}>
            <Number>{index + 1}.</Number>
            {editIndex === index ? (
              <>
                <Input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <EditButton onClick={() => saveEditedTodo(index)}>Save</EditButton>
              </>
            ) : (
              <>
                <Text done={todo.done}>{todo.text}</Text>
                <ActionButtons>
                  <ToggleButton
                    done={todo.done}
                    onClick={() => toggleTodoItem(index)}
                  >
                    {todo.done ? 'Undo' : 'Done'}
                  </ToggleButton>
                  <EditButton onClick={() => editTodoItem(index, todo.text)}>Edit</EditButton>
                  <DeleteButton onClick={() => deleteTodoItem(index)}>Delete</DeleteButton>
                </ActionButtons>
              </>
            )}
          </TodoItem>
        ))}
      </TodoList>
      <Watermark>Made By Vardana </Watermark>
    </Container>
    
  );
};

export default TodoApp;

