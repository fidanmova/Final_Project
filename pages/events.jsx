import PageTemplate from "../components/ui/PageTemplate";

const events = () => {
    return (
        <PageTemplate content="Dev-Shed Community" title="DevShed-Events">
            <div>events</div>
        </PageTemplate>
    );
};

export default events;

// export async function getServerSideProps(context) {
//     const db = await dbConnect();

//     const allEvents = await findAllEvents(db, context.params.username);
//     if (!user) {
//         return {
//             notFound: true,
//         };
//     }
//     user._id = String(user._id);
//     return { props: { user } };
// }
