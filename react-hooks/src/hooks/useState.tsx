// import React, { useState } from "react";

// const App = () => {
//     const [state, setState] = useState({ count: 0, showText: true });
//     const count = state.count;
//     const showText = state.showText;

//     function updateState() {
//         setState({
//             ...state,
//             count: state.count + 1,
//             showText: !state.showText,
//         });
//     }

//     return (
//         <div>
//             <h1>{count}</h1>
//             <button onClick={updateState}>Click Here</button>

//             {showText ? <p>Even Number</p> : <p>Odd Number</p>}
//         </div>
//     );
// };

// export default App;