export default function getErrorStatusCode(response) {
  if (response.status) {
    return response.status
  }
  return 500
}
