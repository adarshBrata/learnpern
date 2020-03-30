import React, {Fragment, useState} from 'react';
const axios = require('axios').default;

const InputTodo = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await axios.post(
                "http://localhost:5000/todos", body
            );
            window.location = ("/");
        } catch (err) {
            console.error(e.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">PERN Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control mt-5"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}

                />
                <button className="btn btn-success mt-5">ADD</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;