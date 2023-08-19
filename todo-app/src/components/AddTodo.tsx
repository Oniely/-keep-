import { useState, KeyboardEvent } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Todo } from "../App";

interface TaskProp {
    onAddTodo: (newTodo: Todo) => void;
}

export const AddTodo: React.FC<TaskProp> = ({ onAddTodo }) => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("Incomplete");

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const saveData = (newTask: Todo) => {
        const existingDataString = localStorage.getItem('tasks');
        const existingData = existingDataString ? JSON.parse(existingDataString) : [];

        existingData.push(newTask);

        const jsonString = JSON.stringify(existingData);
        localStorage.setItem("tasks", jsonString);
    };

    const handleClick = () => {
        if (title.trim() === "") return;

        const newTask: Todo = {
            id: crypto.randomUUID(),
            title,
            status,
        };
        onAddTodo(newTask);
        saveData(newTask);

        setTitle("");
        handleClose();
    };

    function handleEnterKey(e: KeyboardEvent<HTMLFormElement>) {
        if (e.key === "Enter") {
            handleClick();
        } else if (e.key === "Esc") {
            handleClose();
        }
    }

    return (
        <>
            <Button
                variant="primary"
                onClick={handleShow}
                className="px-3 py-2"
                style={{ backgroundColor: "#646ff0" }}
            >
                Add Task
            </Button>

            <form onKeyDown={handleEnterKey}>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex flex-column">
                            <label htmlFor="addTodo">Title</label>
                            <input
                                type="text"
                                id="addTodo"
                                autoFocus
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                style={{
                                    padding: "5px",
                                    margin: "5px 0",
                                }}
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <label htmlFor="status">Status</label>
                            <select
                                name="status"
                                id="status"
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                }}
                                defaultValue={status}
                                style={{
                                    padding: "5px",
                                    margin: "5px 0",
                                }}
                            >
                                <option value="Incomplete">Incomplete</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                        <Button onClick={handleClick}>Add Task</Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </>
    );
};
