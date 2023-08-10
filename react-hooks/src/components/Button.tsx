import { useState, forwardRef, useImperativeHandle } from "react";

export const Button = forwardRef((props, ref) => {
    const [toggle, setToggle] = useState(false);

    useImperativeHandle(ref, () => ({
        alterToggle() {
            setToggle(!toggle);
        },
    }));

    return (
        <>
            <button>Button From Child</button>
            {toggle && <div>Toggle</div>}
        </>
    );
});
