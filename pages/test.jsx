import PageTemplate from "../components/ui/PageTemplate";
// import { auths } from "../middlewares";
// import { ncOpts } from "../utils/nc";
// import nc from "next-connect";
// import Test from "../components/Test";
// import SearchComponent from "../components/ui/Search";
import Feed from "../components/ui/feed/Feed";
import CreateChatModal from "../components/ui/chat/CreateChatModal";
import SendMessage from "../components/ui/chat/SendMessage";
import Head from "next/head";

const test = () => {
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed-Test">
      {/* <CreateChatModal /> */}
      {/* <SendMessage /> */}
      {/* <Test /> */}
      <Feed />
      {/* <SearchComponent /> */}
    </PageTemplate>
  );
};

export default test;
