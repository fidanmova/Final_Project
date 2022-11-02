import React, { useState } from "react";
import { Form, Input, Image } from "react-daisyui";
// import axios from "axios";
// import cookie from "js-cookie";
import { fetcher } from "../../utils/fetcher";
import Router from "next/router";
import { useCurrentUser } from "../../utils/user/hooks";
import { toast } from "react-toastify";
// import baseUrl from "../../utils/baseUrl";
// let cancel;

// function SearchComponent() {
//   const [text, setText] = useState("");
//   // const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState([]);

//   const handleChange = async (e) => {
//     const { value } = e.target;
//     setText(value);
//     // setLoading(true);

//     try {
//       const res = await fetcher(`/api/search/${value}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         // body: JSON.stringify(data),
//       });
//       console.log("res.data from handleChange", res.data);

//       // if (res.data.length === 0) return setLoading(false);

//       setResults(res.data);
//     } catch (error) {
//       console.log("error", error);
//       alert("Error Searching");
//     }
//     // setLoading(false);
//   };

//   return (
//     <Form>
//       <Input
//         type="text"
//         placeholder="Search"
//         onBlur={() => {
//           results.length > 0 && setResults([]);
//           // loading && setLoading(false);
//           setText("");
//         }}
//         // loading={loading}
//         value={text}
//         // resultRenderer={ResultRenderer}
//         results={results}
//         onChange={handleChange}
//         // minCharacters={1}
//         // onResultSelect={(e, data) => Router.push(`/${data.result.username}`)}
//       />
//     </Form>
//   );
// }

// const ResultRenderer = ({ _id, username }) => {
//   return (
//     <div className="z-10 bg-red-400">
//       <ul key={_id}>
//         <li>
//           {/* <Image src={profilePicUrl} alt="ProfilePic" /> */}
//           <div header={username} as="a" />
//           {/* <div>{username}</div> */}
//         </li>
//       </ul>
//     </div>
//   );
// };

const SearchComponent = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { data, error } = useCurrentUser();
  const currentUser = data.user;

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        }
        // config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return <div>{currentUser.username}</div>;
};

export default SearchComponent;
