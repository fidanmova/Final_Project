import PageTemplate from "../../../components/ui/PageTemplate";
// import User from "../../../components/ui/profile/User";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { findPostById } from "../../../utils/db/post";

export default function Chat({ postResult }) {
  console.log("postRESULT =>", postResult);
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed - CHAT">
      <h1>I love: {postResult.creatorId}</h1>
    </PageTemplate>
  );
}

export async function getServerSideProps(context) {
  const db = await dbConnect();
  const postParams = await context.params.postId;

  const post = await findPostById(db, postParams);
  if (!post) {
    return {
      notFound: true,
    };
  }
  console.log("post from postID");
  let postResult = await JSON.parse(JSON.stringify(post));
  return { props: { postResult } };
}
