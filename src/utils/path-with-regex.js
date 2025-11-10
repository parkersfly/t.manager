export function pathWithRegex(path) {
  const routeParams = /:([a-zA-z]+)/g
  const URLWithRegex = path.replaceAll(routeParams, "(?<$1>[a-z0-9\_-]+)")

  const pathRegex = new RegExp(`^${URLWithRegex}(?<query>\\?(.*))?$`)

  return pathRegex
}