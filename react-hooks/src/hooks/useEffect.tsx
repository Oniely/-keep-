// import axios from "axios";
// import { useEffect, useState } from "react";

// const App = () => {
//     const [data, setData] = useState("");
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         axios
//             .get("https://jsonplaceholder.typicode.com/comments")
//             .then((res) => {
//                 setData(res.data[0].email);
//                 console.log("API WAS CALLED");
//             });
//     }, [count]);

//     return (
//         <div>
//             <h1>{data}</h1>
//             <h1>{count}</h1>
//             <button onClick={() => setCount((count) => count + 1)}>Add</button>
//         </div>
//     );
// };

// export default App;
