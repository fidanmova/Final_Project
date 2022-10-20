const { GoogleSearch } = require("google-search-results-nodejs");
const search = new GoogleSearch(
    "c8fd8e5fbb06f230ce52b78ecb67d9404dd33b574d9d8e9ef4fed561b1e273e2"
);

function promisifiedGetJson(params) {
    return new Promise((resolve, reject) => {
        try {
            search.json(params, resolve);
        } catch (e) {
            reject(e);
        }
    });
}

export function getSearchResults(queries) {
    const promises = queries.map(() => {
        const params = {
            q: "software developer",
            engine: "google_jobs",
            location: "london",
            hl: "en",
        };

        return promisifiedGetJson(params);
    });

    return Promise.all(promises);
}

export default async function handler(req, res) {
    const queries = decodeURIComponent(req.query.q).split(",");

    const searchResults = await getSearchResults(queries);

    res.status(200).json(searchResults);
    res.end();
}
