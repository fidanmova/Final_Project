// import PageTemplate from "../../../components/ui/PageTemplate";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { findUserByUsername } from "../../../utils/db";
// import { User } from '@/page-components/User';
import Head from "next/head";

export default function UserPage({ user }) {
  console.log("user from username", user);
  return (
    <>
      <Head>
        <title>
          {user.name} (@{user.username})
        </title>
      </Head>
      {/* <User user={user} /> */}
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await dbConnect();

  // console.log('context.params', context.params);

  const user = await findUserByUsername(db, context.params.username);
  if (!user) {
    return {
      notFound: true,
    };
  }
  user._id = String(user._id);
  return { props: { user } };
}
