import { useState } from "react";
import AuthLanding from "../components/ui/auth/AuthLanding";
import PageTemplate from "../components/ui/PageTemplate";
import Dashboard from "./dashboard";

export default function Home() {
    return (
        <PageTemplate content="Dev-Shed Community" title="DevShed">
            <AuthLanding />
        </PageTemplate>
    );
}
