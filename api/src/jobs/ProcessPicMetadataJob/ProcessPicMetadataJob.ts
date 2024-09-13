import exifParser from 'exif-parser'
import sharp from 'sharp'

import { db } from 'src/lib/db'
import { jobs } from 'src/lib/jobs'
import { logger } from 'src/lib/logger'
import { s3Storage } from 'src/lib/storage'

/**
 * The ProcessPicMetadataJob is on the default queue
 * to process the picture metadata
 * its priority is low because the metadata
 * isn't needed right away
 */
export const ProcessPicMetadataJob = jobs.createJob({
  queue: 'default',
  priority: 30,
  perform: async (picId: string) => {
    jobs.logger.info('ProcessPicMetadataJob is performing...')

    const pic = await db.pic.findUnique({ where: { id: picId } })
    if (!pic) {
      jobs.logger.error(`Pic with id ${picId} not found`)
      throw new Error(`Pic with id ${picId} not found`)
    }
    // read full data from S3
    const { contents } = await s3Storage.read(pic.original)
    console.log('>>>> SHARP', contents)
    const image = await sharp(contents)
      .metadata()
      .then((metadata) => {
        return metadata
      })

    const { height, width, format } = image

    logger.debug({ height, width, format }, 'Image metadata')

    let exif = null

    if (format === 'jpeg' || format === 'jpg') {
      // Extract EXIF data using exif-parser
      const parser = exifParser.create(contents)
      parser.enableSimpleValues(true)

      const result = parser.parse()

      logger.debug({ result }, 'EXIF data')

      exif = JSON.stringify(result.tags || {})
    }

    await db.pic.update({
      where: { id: picId },
      data: {
        width,
        height,
        format,
        exif,
      },
    })
  },
})
