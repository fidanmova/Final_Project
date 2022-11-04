// import PageTemplate from "../../../components/ui/PageTemplate";
// import { dbConnect } from "../../../utils/mongo/mongodb";
// import { findUserByUsername, findUserById } from "../../../utils/db";

// export default function User({ userNew }) {
//   // console.log("UserNEW", userNew);
//   return (
//     <PageTemplate content="Dev-Shed Community" title="DevShed - Home">
//       {/* <title>{userNew}</title> */}
//     </PageTemplate>
//   );
// }

// // ! EEEEERRRRROOOOOORRRRS
// // was [username] before, wanted to try "userId" / ObjectId;

// // export async function getServerSideProps(context) {
// //   const db = await dbConnect();
// //   console.log("context.params", context.params);

// //   const user = await findUserById(db, context.params.userId);
// //   if (!user) {
// //     return {
// //       notFound: true,
// //     };
// //   }
// //   let userNew = await JSON.parse(JSON.stringify(user));

// //   // user._id = String(user._id); => does NOT work!
// //   return { props: { userNew } };
// // }
