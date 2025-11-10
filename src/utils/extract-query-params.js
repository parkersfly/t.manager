export function extractQueryParams(query){
  return query.substr(1).split("&").reduce((queryParam, item) => {
    const [key, value] = item.split("=")

    queryParam[key] = value

    return queryParam
  }, {})
}