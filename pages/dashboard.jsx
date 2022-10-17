import PageTemplate from "../components/ui/PageTemplate";
import DashBoard from "../components/DashBoard";

export default function Dashboard({ user }) {
    console.log('user page', user)
    return (
        <PageTemplate content="Dev-Shed Community" title="DevShed - Home">
            <DashBoard user={user} />
        </PageTemplate>
    );
}
