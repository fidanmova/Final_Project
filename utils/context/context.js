const { createContext, useState, useEffect } = require("react");

const Context = createContext();

function ContextProvider({ children }) {
  const [selectedChat, setSelectedChat] = useState("");

  // useEffect(() => {
  //   if (searchParams) {
  //     console.log("Initial query / update caught!");
  //   }
  // }, [searchParams]);

  return (
    <Context.Provider
      value={{
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
