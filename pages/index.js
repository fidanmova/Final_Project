import LandingHero from "../components/landing/LandingHero";

import PageTemplate from "../components/ui/PageTemplate";

export default function Home() {
    return (
        <PageTemplate content="Dev-Shed Community" title="DevShed">
            <LandingHero />
        </PageTemplate>
    );
}
