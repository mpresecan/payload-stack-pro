import { getPayloadHMR} from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export const getPayload = async () => {
  return await getPayloadHMR({config: configPromise})
}
