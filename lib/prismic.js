import Prismic from "prismic-javascript";

const config = {
  apiEndpoint: "https://bradley-mccallum.prismic.io/api",

  // -- Links resolution rules
  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver(doc, ctx) {
    return "/";
  },
};

const apiEndpoint = "https://bradley-mccallum.prismic.io/api/v2";

// var apiToken = "MC5XVHFod1NrQUFDWUE0RVFw...e-_vX5dYu-_vQnvv70";
const apiToken = null;

export function getApi(req) {
  return Prismic.getApi(apiEndpoint, { accessToken: apiToken, req });
}

// return api.query(""); // An empty query will return all the documents
