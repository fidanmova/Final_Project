import PageTemplate from "../../../components/ui/PageTemplate";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { findUserByUsername } from "../../../utils/db";

export default function User({ userNew }) {
  console.log("USERNAME-user", userNew);
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed - Home">
      <title>{userNew.username}</title>
    </PageTemplate>
  );
}

export async function getServerSideProps(context) {
  const db = await dbConnect();
  console.log("context.params", context.params);

  const user = await findUserByUsername(db, context.params.username);
  if (!user) {
    return {
      notFound: true,
    };
  }
  let userNew = await JSON.parse(JSON.stringify(user));

  // user._id = String(user._id);
  return { props: { userNew } };
}
