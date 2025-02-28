import React, { createContext, useState } from "react";
import run from "../components/config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]); // Ensure prevPrompts is initialized as an empty array
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResults(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
      if (!prevPrompts.includes(prompt)) {
        setPrevPrompts((prev) => [...prev, prompt]); // Add the prompt to prevPrompts if it doesn't already exist
      }
    } else {
      if (!prevPrompts.includes(input)) {
        setPrevPrompts((prev) => [...prev, input]);
      }
      setRecentPrompt(input);
      response = await run(input);
    }

    setResultData(response);
    setLoading(false);
    setInput("");
  };

  const resetChat = () => {
    setInput("");
    setRecentPrompt("");
    setShowResults(false);
    setResultData("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResults,
    loading,
    resultData,
    input,
    setInput,
    resetChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
