import React, {Fragment, useEffect, useState} from 'react';
const axios = require("axios").default;

const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    const getTodo = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/todos"
            );
            const jsonData = response.data;
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteTodo = async (tid) => {
        try {
            const deleteTodo = await axios.delete("http://localhost:5000/todos/" + tid);
            setTodos(todos.filter((todo) => todo.tid !== tid))
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodo();
    }, []);
    console.log(todos);
    return (
        <Fragment>
            <table className="table table-striped mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {/*
                <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr>
                */}
                {todos.map(todo => (
                    <tr key={todo.tid}>
                        <td>{todo.description}</td>
                        <td><button className="btn btn-primary">Edit</button></td>
                        <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.tid)}>DEL</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodo;