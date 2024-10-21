import { InputHTMLAttributes, forwardRef } from "react";

export default forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(props, ref) {
    return <input ref={ref} className="form-control form-control-lg" {...props} />
});