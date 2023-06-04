import React, { useEffect, useRef, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";

const AutoResizeTextarea = (props) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    const adjustTextareaHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener("input", adjustTextareaHeight);
    adjustTextareaHeight(); // Initial adjustment

    return () => {
      textarea.removeEventListener("input", adjustTextareaHeight);
    };
  }, []);

  const { defaultValue, ...restProps } = props;

  const [hoveredInputs, setHoveredInputs] = useState([]);

  const handleMouseEnter = (index) => {
    setHoveredInputs((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const handleMouseLeave = (index) => {
    setHoveredInputs((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  return (
    // <div className="relative">
    //   <textarea
    //     className="border-2 border-black drop-shadow-2xl m-0"
    //     ref={textareaRef}
    //     defaultValue={defaultValue}
    //     {...restProps}
    //     style={{
    //       resize: "none",
    //       outline: "none",
    //       overflow: "hidden",
    //       minHeight: "2rem",
    //       lineHeight: "1.25",
    //     }}
    //     rows={1}
    //   />
    //   <div
    //     className="bottom-1 absolute inset-y-0 right-0 pr-3 flex items-center cursor-default"
    //     onMouseEnter={() => handleMouseEnter(0)}
    //     onMouseLeave={() => handleMouseLeave(0)}
    //   >
    //     <HiInformationCircle className="text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2" />
    //   </div>
    //   {hoveredInputs[0] && (
    //     <div className="absolute bg-gray-800 text-white text-sm px-4 py-2 rounded-md">
    //       May or may not include the initial question.
    //     </div>
    //   )}
    // </div>
    <div className="relative">
      <textarea
        className="border-2 border-black drop-shadow-2xl m-0"
        ref={textareaRef}
        defaultValue={defaultValue}
        {...restProps}
        style={{
          resize: "none",
          outline: "none",
          overflow: "hidden",
          minHeight: "2rem",
          lineHeight: "1.25",
        }}
        rows={1}
      />
      <div
        className="bottom-1 absolute inset-y-0 right-0 pr-3 flex items-center cursor-default"
        onMouseEnter={() => handleMouseEnter(0)}
        onMouseLeave={() => handleMouseLeave(0)}
      >
        <HiInformationCircle className="text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2" />
        {hoveredInputs[0] && (
          <div className="absolute bg-gray-800 text-white text-sm px-4 py-2 rounded-md right-4 bottom-full mb-2 w-64 sm:w-56">
            May or may not include the initial question.
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoResizeTextarea;
