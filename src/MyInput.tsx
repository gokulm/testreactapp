import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef } from "react";

export interface MyInputHandles {
  focus(): void;
  test(): void;
}

export interface MyInputProps {
}

const MyInput: ForwardRefRenderFunction<MyInputHandles, MyInputProps> = (
  props,
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    test: () => {
      if (inputRef.current) {
        inputRef.current.width = 500;
        console.log("handling test in myinput.tsx");
      }
    }
  }));

  return <input {...props} ref={inputRef} />;
};

export default forwardRef(MyInput);