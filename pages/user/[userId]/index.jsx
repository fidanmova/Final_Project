import PageTemplate from "../../../components/ui/PageTemplate";
import Profile from "../../../components/ui/profile/Profile";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { findUserById } from "../../../utils/db/user";

export default function User({ user }) {
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed - CHAT">
      <Profile user={user} />
      {/* <h1>I love: {userResult.username}</h1> */}
    </PageTemplate>
  );
}
export async function getServerSideProps(context) {
  const db = await dbConnect();
  const userParams = await context.params.userId;

  const userResult = await findUserById(db, userParams);
  if (!userResult) {
    return {
      notFound: true,
    };
  }
  let user = await JSON.parse(JSON.stringify(userResult));
  return { props: { user } };
}
