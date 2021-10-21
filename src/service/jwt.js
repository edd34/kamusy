function decode_jwt(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const buff = Buffer.from(base64, 'base64')
  const payloadinit = buff.toString('ascii')
  const payload = JSON.parse(payloadinit)
  return payload
}

export { decode_jwt }
