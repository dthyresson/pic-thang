import type { APIGatewayEvent, Context } from 'aws-lambda'

import type { SignatureValidationArgs } from '@redwoodjs/storage/UrlSigner'

import { logger } from 'src/lib/logger'
import { urlSigner, fsStorage } from 'src/lib/storage'

export const handler = async (event: APIGatewayEvent, _context: Context) => {
  try {
    const fileToReturn = urlSigner.validateSignature(
      event.queryStringParameters as SignatureValidationArgs
    )

    const { contents, type } = await fsStorage.read(fileToReturn)

    // Generate an ETag from the file contents
    const etag = Buffer.from(contents).toString('base64').substring(0, 27)

    return {
      statusCode: 200,
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, max-age=31536000, immutable',
        ETag: `"${etag}"`,
        Date: new Date().toUTCString(),
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Max-Age': '86400',
      },
      body: contents,
    }
  } catch (error) {
    logger.error(error, 'Error reading file')
    return {
      statusCode: 404,
      body: 'Not found',
    }
  }
}
