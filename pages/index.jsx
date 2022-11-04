import AuthLanding from "../components/ui/auth/AuthLanding";
import PageTemplate from "../components/ui/PageTemplate";

export default function Home() {
    return (
        <PageTemplate content="Dev-Shed Community" title="DevShed">
            <AuthLanding />
        </PageTemplate>
    );
}
