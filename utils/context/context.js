const { createContext, useState, useEffect } = require("react");

const Context = createContext();

function ContextProvider({ children }) {
  // allUsersData is projected, only provides: username and avatar
  const [allUsersData, setAllUsersData] = useState([]);
  // groupMembers of chat group:
  const [groupMembers, setGroupMembers] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");
  const [chatObject, setChatObject] = useState({});

  useEffect(() => {
    fetch(`/api/users/forChat`)
      .then((res) => res.json())
      .then(
        (results) => {
          if (allUsersData.length === 0) {
            setAllUsersData(results.users);
          }
          if (
            chatObject &&
            Object.keys(chatObject).length === 0 &&
            Object.getPrototypeOf(chatObject) === Object.prototype
          ) {
            console.log("No chat selected");
          } else {
            let groupMembers = chatObject.users;
            console.log("chatObject =>", groupMembers);
            let groupMembersArray = [];
            groupMembers.map((groupMember) => {
              let result = allUsersData.filter(
                (member) => member._id === groupMember
              );
              groupMembersArray.push(result);
              return groupMembersArray;
            });
            const groupMembersAll = groupMembersArray.flat(1);
            setGroupMembers(groupMembersAll);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }, [chatObject, setAllUsersData, allUsersData, setGroupMembers]);
  return (
    <Context.Provider
      value={{
        allUsersData,
        setAllUsersData,
        groupMembers,
        setGroupMembers,
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
