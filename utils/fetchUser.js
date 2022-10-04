import { sampleModel } from "../models/sample";

export const fetchSocial = async () => {
    const res = await fetch("http:locahost:3000/api/allUser");

    const data = await res.json();

    return data;
};
