import React, {Fragment, useState} from 'react';
const axios = require("axios").default;

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);

    const editDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await axios.put(
                "http://localhost:5000/todos/" + todo.tid,
                body
            );
            window.location = ("/");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.tid}`}>
                Edit
            </button>


            <div className="modal" id={`id${todo.tid}`} onClick={() => setDescription(todo.description)}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button type="button" className="close" onClick={() => setDescription(todo.description)} data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={(e) => editDescription(e)}>Edit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTodo;