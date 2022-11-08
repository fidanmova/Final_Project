import PageTemplate from "../../../components/ui/PageTemplate";
// import User from "../../../components/ui/profile/User";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { findUserById } from "../../../utils/db/user";

export default function Chat({ userResult }) {
  console.log("userRESULT =>", userResult);
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed - CHAT">
      {/* <User userResult={userResult}> */}
      <h1>I love: {userResult.username}</h1>
    </PageTemplate>
  );
}

export async function getServerSideProps(context) {
  const db = await dbConnect();
  const userParams = await context.params.userId;

  const user = await findUserById(db, userParams);
  if (!user) {
    return {
      notFound: true,
    };
  }
  let userResult = await JSON.parse(JSON.stringify(user));
  return { props: { userResult } };
}
