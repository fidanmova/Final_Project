import PageTemplate from "../components/ui/PageTemplate";
// import { auths } from "../middlewares";
// import { ncOpts } from "../utils/nc";
// import nc from "next-connect";
// import Test from "../components/Test";
// import SearchComponent from "../components/ui/Search";
import Feed from "../components/ui/feed/Feed";
import CreateChatModal from "../components/ui/chat/CreateChatModal";
// import ProfileModel from "../components/ui/profile/ProfileModel";

const test = () => {
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed-Test">
      {/* <CreateChatModal /> */}
      {/* <ProfileModel /> */}
      {/* <Feed /> */}
      {/* <Test /> */}
      <Feed />
      {/* <SearchComponent /> */}
    </PageTemplate>
  );
};

export default test;
