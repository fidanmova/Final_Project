import PageTemplate from "../components/ui/PageTemplate";
import Test from "../components/Test";
// import SearchComponent from "../components/ui/Search";
// import AddGroupMember from "../components/ui/chat/AddGroupMember";
// import Feed from "../components/ui/feed/Feed";

const test = () => {
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed-Test">
      {/* <Feed /> */}
      <Test />
      {/* <SearchComponent /> */}
      {/* <AddGroupMember /> */}
    </PageTemplate>
  );
};

export default test;
