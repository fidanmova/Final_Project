const { GoogleSearch } = require("google-search-results-nodejs");

// ## Serp API Key for google search ##
//## New API Key 17/11/22  ##
const search = new GoogleSearch(
  "001369363df57dfbf6dc1d79b83cb96e58bd4fef725ece332cc65b60c674b7c3"
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

export function getSearchResults(queries, terms) {
  const promises = queries.map(() => {
    const params = {
      // ## Google Search Trerms ##
      q: terms[0], //"web developer",
      engine: "google_jobs",
      location: terms[1], //"berlin",
      hl: "en",
    };

    return promisifiedGetJson(params);
  });

  return Promise.all(promises);
}

export default async function handler(req, res) {
  const queries = decodeURIComponent(req.query.q).split(",");
  // console.log("Req.Params =", req.query);
  const terms = req.query.searchTerms;
  const searchResults = await getSearchResults(queries, terms);

  res.status(200).json(searchResults);

  res.end();
}
