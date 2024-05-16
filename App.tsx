import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      if (editIndex !== null) {
        // Editing existing todo
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // Adding new todo
        setTodos([...todos, newTodo]);
      }
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const editTodo = (index) => {
    setNewTodo(todos[index]);
    setEditIndex(index);
  };

  return (
    <View style={styles.container}>
    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff", textAlign: "center" ,marginTop:50}}>TODO APP 📝 {"\n\n"}</Text>
      <TextInput 
        style={styles.input}
        placeholder='Enter Your Todo....'
        value={newTodo}
        onChangeText={text => setNewTodo(text)}
      />
      <TouchableOpacity onPress={addTodo} style={styles.addButton}>
        <Text style={styles.buttonText}>{editIndex !== null ? 'Save Todo' : 'Add Todo'}</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item}</Text>
            <TouchableOpacity onPress={() => deleteTodo(index)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => editTodo(index)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 5,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  todoText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  editButton: {
    color: '#ffa500',
    marginRight: 10,
    marginLeft: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default App;
