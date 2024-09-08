import { db } from 'src/lib/db'
import { describeImage } from 'src/lib/fal'
import { jobs } from 'src/lib/jobs'

export const DescribePicJob = jobs.createJob({
  queue: 'default',
  perform: async (picId: number) => {
    jobs.logger.info({ picId }, 'DescribePicJob is performing...')
    const pic = await db.pic.findUnique({
      where: { id: picId },
    })

    if (!pic) {
      jobs.logger.error({ picId }, 'Pic not found')
      return
    }

    const picDataUri = await pic.withDataUri()

    jobs.logger.debug({ picId }, 'Pic to get data uri')

    const result = await describeImage({ imageUrl: picDataUri.original })
    jobs.logger.debug({ result }, 'Fal describe result')

    const description = (result['results'] as string) || ''
    jobs.logger.debug({ picId }, 'Fal describe done!')

    await db.pic.update({
      where: { id: picId },
      data: {
        description,
      },
    })

    jobs.logger.debug({ picId }, 'Pic updated!')
    jobs.logger.info({ picId }, 'DescribePicJob done!')
  },
})
