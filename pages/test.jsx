import PageTemplate from "../components/ui/PageTemplate";
import Test from "../components/Test";
// import SearchComponent from "../components/ui/Search";
import Feed from "../components/ui/feed/Feed";
import CreateChatModal from "../components/ui/chat/CreateChatModal";

const test = () => {
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed-Test">
      {/* <CreateChatModal /> */}
      <Feed />
      {/* <Test /> */}
      {/* <SearchComponent /> */}
    </PageTemplate>
  );
};

export default test;
