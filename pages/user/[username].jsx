import PageTemplate from "../components/ui/PageTemplate";
import { dbConnect } from "../../utils/mongo/mongodb";
import { findUserByUsername } from "../../utils/db";

export default function User({ user }) {
    console.log("USERNAME-user", user);
    return (
        <PageTemplate content="Dev-Shed Community" title="DevShed - Home">
            <title>{user.username}</title>
        </PageTemplate>
    );
}

export async function getServerSideProps(context) {
    const db = await dbConnect();

    const user = await findUserByUsername(db, context.params.username);
    if (!user) {
        return {
            notFound: true,
        };
    }
    user._id = String(user._id);
    return { props: { user } };
}
