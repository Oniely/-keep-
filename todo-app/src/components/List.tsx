import { useState } from "react";
import { Todo } from "../App";

interface ListProp {
    task: Todo[];
    filter?: string;
}

export const List = ({ task, filter }: ListProp) => {
    const [checked, setChecked] = useState(true);

    const filteredTask = task.filter((item) => {
        if (filter === "All") {
            return true;
        } else {
            return item.status === filter;
        }
    });

    return (
        <>
            <ul className="list-group d-flex justify-content-center gap-3">
                {filteredTask.length <= 0 && (
                    <div className="text-center p-3">
                        <span className="fs-3" style={{ color: "gray" }}>
                            No Todo
                        </span>
                    </div>
                )}
                {filteredTask.map((item) => {
                    return (
                        <li
                            className="list-group-item d-flex justify-content-between"
                            style={{
                                border: "0",
                                borderRadius: "3px",
                                paddingTop: "12px",
                                paddingBottom: "12px",
                            }}
                            key={item.id}
                        >
                            <div className="d-flex justify-content-center align-items-center">
                                <input
                                    type="checkbox"
                                    id={item.id}
                                    checked={
                                        item.status === "Completed" && true
                                    }
                                    onChange={() => {
                                        if (item.status === "Completed") {
                                            item.status = "Incomplete";
                                        } else if (
                                            item.status === "Incomplete"
                                        ) {
                                            item.status = "Completed";
                                        }
                                        setChecked(!checked);
                                    }}
                                />
                                <label
                                    htmlFor={item.id}
                                    className={
                                        item.status === "Completed"
                                            ? "label completed-label"
                                            : "label"
                                    }
                                >
                                    {item.title}
                                </label>
                            </div>
                            <div className="d-flex justify-content-center align-items-center gap-2">
                                <button className="btn btn-sm" id="liBtn">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 448 512"
                                    >
                                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                    </svg>
                                </button>
                                <button className="btn btn-sm" id="liBtn">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
