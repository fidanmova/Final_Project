import React, { useState } from "react";
import { Form, Input, Image } from "react-daisyui";
// import axios from "axios";
// import cookie from "js-cookie";
import fetcher from "../../utils/fetcher";
import Router from "next/router";
// import baseUrl from "../../utils/baseUrl";
// let cancel;

function SearchComponent() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleChange = async (e) => {
    const { value } = e.target;
    setText(value);
    setLoading(true);

    try {
      // cancel && cancel();
      // const CancelToken = axios.CancelToken;
      // const token = cookie.get("token");

      // const res = await fetcher(`/api/search/${value}`, {
      const res = await fetcher(`/api/users/${value}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      console.log("res.data from handleChange", res.data);

      if (res.data.length === 0) return setLoading(false);

      setResults(res.data);
    } catch (error) {
      console.log("error", error);
      alert("Error Searching");
    }
    setLoading(false);
  };

  return (
    <Form>
      <Input
        type="text"
        placeholder="Search"
        onBlur={() => {
          results.length > 0 && setResults([]);
          loading && setLoading(false);
          setText("");
        }}
        loading={loading}
        value={text}
        resultRenderer={ResultRenderer}
        results={results}
        onChange={handleChange}
        minCharacters={1}
        onResultSelect={(e, data) => Router.push(`/${data.result.username}`)}
      />
    </Form>
  );
}

const ResultRenderer = ({ _id, profilePicUrl, name }) => {
  return (
    <div className="z-10 bg-red-400">
      <ul key={_id}>
        <li>
          {/* <Image src={profilePicUrl} alt="ProfilePic" /> */}
          {/* <div header={name} as="a" /> */}
          <p>{name}</p>
        </li>
      </ul>
    </div>
  );
};

export default SearchComponent;
