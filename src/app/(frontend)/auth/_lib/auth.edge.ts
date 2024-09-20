import 'server-only'

import { sha256 } from 'oslo/crypto'
import { encodeHex } from 'oslo/encoding'
/**
 * Payload's own manipulation for PAYLOAD_SECRET.
 * - Edge compatible.
 */
export async function getPayloadSecret(): Promise<string> {
  const data = new TextEncoder().encode(process.env.PAYLOAD_SECRET!!)
  const hashBuffer = await sha256(data)
  const hashHex = encodeHex(hashBuffer)
  return hashHex.slice(0, 32)
}
