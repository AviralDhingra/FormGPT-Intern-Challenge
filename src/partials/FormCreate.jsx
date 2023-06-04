import React, { useRef, useState } from "react";
import AutoResizeTextarea from "../utils/AutoResizeTextarea";
import Text from "../utils/Text";

import { HiInformationCircle } from "react-icons/hi";

function FormCreate({ handleSubmit, values, error }) {
  const [bg, setBg] = useState(
    values.length === 0 ? "#888888" : values["background"]
  );
  const [box, setBox] = useState(
    values.length === 0 ? "#ffffff" : values["box"]
  );
  const [btn, setBtn] = useState(
    values.length === 0 ? "#0000ff" : values["button"]
  );
  const [logo, setLogo] = useState(values.length === 0 ? "" : values["logo"]);

  const bgInput = useRef(null);
  const boxInput = useRef(null);
  const btnInput = useRef(null);
  const logoInput = useRef(null);

  const handleBackgroundChange = () => {
    setBg(bgInput.current.value);
  };

  const handleBoxChange = () => {
    setBox(boxInput.current.value);
  };

  const handleButtonChange = () => {
    setBtn(btnInput.current.value);
  };
  const handleLogoChange = () => {
    setLogo(logoInput.current.value);
  };

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
    <form onSubmit={handleSubmit}>
      <div className="relative max-w-sm mx-auto grid gap-10 gap-y-10 md:grid-cols-3 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
        <div className="relative rounded-md">
          <label
            className="text-blue-500 block text-sm font-medium mb-1"
            htmlFor="default"
          >
            Form Name <span className="text-rose-500">*</span>
          </label>
          <AutoResizeTextarea
            autoFocus
            className="form-input w-full"
            type="text"
            name="name"
            placeholder="Restraunt Review"
            defaultValue={values.length === 0 ? "" : values["name"]}
          />
        </div>

        <div className="relative rounded-md col-span-2">
          <label
            className="text-blue-500 block text-sm font-medium mb-1"
            htmlFor="default"
          >
            Goal <span className="text-rose-500">*</span>
          </label>
          <AutoResizeTextarea
            className="form-input w-full"
            type="text"
            name="goal"
            placeholder="E.g. Collecting feedback, running a survey, interviewing a person for a job"
            defaultValue={values.length === 0 ? "" : values["goal"]}
          />
        </div>

        <div className="relative rounded-md col-span-full">
          <label
            className="text-blue-500 block text-sm font-medium mb-1"
            htmlFor="default"
          >
            Questions <span className="text-rose-500">*</span>
          </label>
          <AutoResizeTextarea
            className="form-input w-full"
            type="text"
            name="questions"
            placeholder={
              "1. How was your experience at our restaurant? \n\n2. What about our services did you like? \n\n3. What about our services did you dislike? \n\n4. Is there anything else you would like to share?"
            }
            defaultValue={values.length === 0 ? "" : values["questions"]}
            desc="May or may not include the inital question."
          />
        </div>

        <div className="rounded-md col-span-full flex flex-col">
          <label
            className="text-blue-500 block text-sm font-medium mb-1"
            htmlFor="default"
          >
            Questioning Prompting
          </label>
          <AutoResizeTextarea
            className="form-input w-full"
            type="text"
            name="initialPrompting"
            placeholder={
              "E.g. Invite the customer to come back and tell them about our 10% sale on Friday."
            }
            defaultValue={values.length === 0 ? "" : values["initialPrompting"]}
            desc="Give additional instructions or information to FormGPT during the questioning phase."
          />
        </div>

        <div className="rounded-md col-span-full">
          <label
            className="text-blue-500 block text-sm font-medium mb-1"
            htmlFor="default"
          >
            Summary Prompting
          </label>
          <AutoResizeTextarea
            className="form-input w-full"
            type="text"
            name="summaryPrompting"
            placeholder={`E.g. Make sure to mention what the customer said about our milkshake.`}
            defaultValue={values.length === 0 ? "" : values["summaryPrompting"]}
            desc="If you would like to, provide additional instructions for the conversation summarizing phase. Note that this will not ask the user about the milkshake, but only guarentee that it is mentioned in the summary if the customer did!"
          />
        </div>

        <div className="rounded-md col-span-2">
          <label
            className="text-blue-500 block text-sm font-medium mb-1"
            htmlFor="default"
          >
            Custom Table
          </label>
          <AutoResizeTextarea
            className="form-input w-full"
            type="text"
            name="table"
            placeholder={"E.g. How did the customer describe their experience?"}
            defaultValue={values.length === 0 ? "" : values["tbl"]}
            desc="Provide a list of columns in a table. They should be formatted as questions that will have been answered and separated newlines (pressing Enter). Note that this will not guarentee this information is recorded, but instead create a table including exclusively this information! A column will be added for NPS if enabled."
          />
        </div>

        <div className="flex items-center justify-center rounded-md col-span-1 translate-y-8 relative">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              name="nps"
              defaultChecked={values.length === 0 ? "" : values["nps"] === 1}
            />
            <span className="text-sm ml-2 mr-8">Record NPS</span>
          </label>

          <div
            className="bottom-1 absolute inset-y-0 right-0 pr-3 flex items-center cursor-default"
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={() => handleMouseLeave(0)}
          >
            <HiInformationCircle className="text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2" />
            {hoveredInputs[0] && (
              <div className="absolute bg-gray-800 text-white text-sm px-4 py-2 rounded-md right-4 bottom-full mb-2 w-64 sm:w-56">
                <div className="text-xs mt-1">
                  This settings should be on for feedback forms and likely left
                  off for others.
                  <br />
                  <a
                    href="https://www.hotjar.com/net-promoter-score/"
                    target="_blank"
                    className="text-indigo-500 hover:text-indigo-600"
                  >
                    Net Promoter Score
                  </a>{" "}
                  (NPS) measures customer advocacy on a 0-10 scale, and then
                  colates those individual responses to a net promotion number
                  from -100 to 100. It's a powerful tool for assessing
                  satisfaction, identifying critical responses, and driving
                  strategic decisions for business success. FormGPT automates
                  NPS calculation and graphing, without specifically needing to
                  ask for a number from 0-10.
                </div>
              </div>
            )}
          </div>

          {/* <div className="text-xs mt-1">
              This settings should be on for feedback forms and likely left off
              for others.
              <br />
              <a
                href="https://www.hotjar.com/net-promoter-score/"
                target="_blank"
                className="text-indigo-500 hover:text-indigo-600"
              >
                Net Promoter Score
              </a>{" "}
              (NPS) measures customer advocacy on a 0-10 scale, and then colates
              those individual responses to a net promotion number from -100 to
              100. It's a powerful tool for assessing satisfaction, identifying
              critical responses, and driving strategic decisions for business
              success. FormGPT automates NPS calculation and graphing, without
              specifically needing to ask for a number from 0-10.
            </div> */}
        </div>
      </div>

      {values.length === 0 ? (
        ""
      ) : (
        <p className="mt-2">
          Some features cannot be edited to prevent messy data. You should
          instead create a new form.
        </p>
      )}

      <hr className="mt-4 mb-4" />

      <div className="relative max-w-sm mx-auto grid gap-20 md:grid-cols-3 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none my-10">
        <div className="col-span-1">
          <label
            className="text-blue-500 block text-sm font-medium mb-1"
            htmlFor="default"
          >
            Background Color <span className="text-rose-500">*</span>
          </label>
          <input
            className="form-input w-full h-16 p-0 border-none"
            type="color"
            name="background"
            defaultValue={bg}
            ref={bgInput}
            onChange={handleBackgroundChange}
          />
        </div>

        <div className="rounded-md col-span-1">
          <label
            className="text-blue-500 block text-sm font-medium mb-1 "
            htmlFor="default"
          >
            Box Color <span className="text-rose-500">*</span>
          </label>
          <input
            className="form-input w-full h-16 p-0 border-none"
            type="color"
            name="box"
            defaultValue={box}
            ref={boxInput}
            onChange={handleBoxChange}
          />
        </div>

        <div className="rounded-md col-span-1">
          <label
            className="text-blue-500 block text-sm font-medium mb-1"
            htmlFor="default"
          >
            Button Color <span className="text-rose-500">*</span>
          </label>
          <input
            className="form-input w-full h-16 p-0 border-none"
            type="color"
            name="button"
            defaultValue={btn}
            ref={btnInput}
            onChange={handleButtonChange}
          />
        </div>

        <div className=" rounded-md col-span-2">
          <label
            className="text-blue-500 block text-sm font-medium mb-1"
            htmlFor="default"
          >
            Redirect
          </label>
          <AutoResizeTextarea
            className="form-input w-full"
            type="text"
            name="redirect"
            defaultValue={values.length === 0 ? "" : values["redirect"]}
            onChange={handleLogoChange}
          />
          <div className="text-xs mt-1">
            Choose a destination for the user to go after the form is complete.
            The default is google.com.
          </div>
        </div>

        <div className=" rounded-md">
          <label
            className="text-blue-500 block text-sm font-medium mb-1"
            htmlFor="default"
          >
            Logo Link
          </label>
          <input
            className="form-input w-full"
            type="text"
            ref={logoInput}
            name="logo"
            onChange={handleLogoChange}
            defaultValue={values.length === 0 ? "" : values["logo"]}
          />
          {/* <div className="text-xs mt-1">
            Write a link to a logo to be displayed in the top-left corner. It
            will be resized to a square.
          </div> */}
        </div>
      </div>

      <hr className="mt-4 mb-4" />

      <div
        className="container my-10 rounded-xl"
        style={{ backgroundColor: bg, height: "50vh", position: "relative" }}
      >
        {logo == "" ? (
          ""
        ) : (
          <img src={logo} className="absolute top-0 left-0 m-4 w-8 h-8" />
        )}
        <div className="square" style={{ backgroundColor: box }}>
          <h1 className="text-lg font-semibold mb-2">
            <Text bg={box}>#1: Lorem ipsum</Text>
          </h1>
          <div>
            <input
              name="response"
              className="rounded-md w-5/6"
              value="This is a demo to show how your form will look. You can't fill out the form here!"
              disabled={true}
            />
            <button
              disabled
              type="submit"
              className="btn ml-3"
              style={{ backgroundColor: btn }}
            >
              <Text bg={btn}>Next</Text>
            </button>
          </div>
        </div>
      </div>

      <hr className="mt-4 mb-4" />

      <p className="text-rose-600 mt-4">{error}</p>

      {values.length === 0 ? (
        <button
          type="submit"
          className="btn bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <svg
            className="w-4 h-4 fill-current opacity-50 shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="hidden xs:block ml-2">Create</span>
        </button>
      ) : (
        <button
          type="submit"
          className="btn bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <svg
            className="w-4 h-4 fill-current opacity-50 shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
          </svg>
          <span className="hidden xs:block ml-2">Save</span>
        </button>
      )}
    </form>
  );
}

export default FormCreate;
