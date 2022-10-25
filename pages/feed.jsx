import PageTemplate from "../components/ui/PageTemplate";
import Feed from "../components/ui/feed/Feed";

const feed = () => {
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed-Feed">
      <Feed />
    </PageTemplate>
  );
};

export default feed;
