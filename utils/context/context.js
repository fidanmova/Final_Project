const { createContext, useState, useEffect } = require("react");

const Context = createContext();

function ContextProvider({ children }) {
  const [selectedChat, setSelectedChat] = useState("");
  const [chatObject, setChatObject] = useState({});

  return (
    <Context.Provider
      value={{
        selectedChat,
        setSelectedChat,
        chatObject,
        setChatObject,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
