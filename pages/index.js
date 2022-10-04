import { useState } from "react";
import AuthLanding from "../components/ui/auth/AuthLanding";
import PageTemplate from "../components/ui/PageTemplate";
import Homepage from "../components/Homepage";

export default function Home() {
    const [user, setuser] = useState(null);

    return (
        <PageTemplate content="Dev-Shed Community" title="DevShed">
            {user === null ? <AuthLanding /> : <Homepage />}
        </PageTemplate>
    );
}
