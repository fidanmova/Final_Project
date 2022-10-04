import { useState } from "react";
import { Divider } from "react-daisyui";
import Homepage from "../components/Homepage";

import PageTemplate from "../components/ui/PageTemplate";

export default function HomePage() {
    const [sample, setSample] = useState([]);
    console.log('sample', sample)

    const fetchSample = async () => {
        const response = await fetch("/api/sample");
        const data = await response.json();
        setsample(data);
    };

    return (
        <PageTemplate content="Dev-Shed Community" title="DevShed - Home">
            {/* <Homepage /> */}
            {sample && sample.map((x, i) => <div key={i}>{x.name}</div>)}
        </PageTemplate>
    );
}
