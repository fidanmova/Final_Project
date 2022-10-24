const { GoogleSearch } = require("google-search-results-nodejs");

// ## Serp API Key for google search ##
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
  // console.log(req.body.job);
  // data = req.body;
  const promises = queries.map(() => {
    const params = {
      // ## Google Search Trerms ##
      q: "web developer",
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
  console.log("Req.Query.q =", queries);

  // console.log("Job Inputs ==> ", req.query);
  const searchResults = await getSearchResults(queries);

  res.status(200).json(searchResults);
  // console.log("Results", searchResults);
  res.end();
}
