import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { List } from "./components/List";
import { AddTodo } from "./components/AddTodo";
import { Credits } from "./components/Credits";

export interface Todo {
    id: string;
    title: string;
    status: string;
}

const App: React.FC<Todo> = () => {
    const [filter, setFilter] = useState("All");
    const [todo, setTodo] = useState<Todo[]>([]);

    const handleAddTodo = (newTodo: Todo) => {
        setTodo(prevTodos => [...prevTodos, newTodo])
    }

    return (
        <>
            <Container
                className="mt-4"
                style={{
                    width: "60%",
                }}
            >
                <h1
                    className="text-center mb-4"
                    style={{
                        fontSize: "40px",
                        fontWeight: "700",
                        color: "#646681",
                    }}
                >
                    TODO LIST
                </h1>

                <div className="d-flex justify-content-between align-items-center py-2">
                    <AddTodo onAddTodo={handleAddTodo} />
                    <select
                        className="btn text-start"
                        name="dropbtn"
                        id="dropbtn"
                        value={filter}
                        style={{
                            backgroundColor: "#cccdde",
                            color: "#585858",
                        }}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Incomplete">Incomplete</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div
                    className="p-3"
                    style={{
                        borderRadius: "10px",
                        backgroundColor: "#ecedf6",
                    }}
                >
                    <List task={todo} filter={filter} />
                </div>
            </Container>
            <Credits />
        </>
    );
};

export default App;
