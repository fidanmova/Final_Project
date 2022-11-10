const { GoogleSearch } = require("google-search-results-nodejs");

// ## Serp API Key for google search ##
const search = new GoogleSearch(
  "4bc7bbd9d819cfe93a7ae11034046d8517fa3e2d8f70e77333371b435bc8794f"
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
