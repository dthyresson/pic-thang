import { GetRedwoodUploadTokenResolver } from 'types/uploads'

import { createUploadToken } from '@redwoodjs/upload'
import type { UploadTokenPayload } from '@redwoodjs/upload'

export const getRedwoodUploadToken: GetRedwoodUploadTokenResolver = async ({
  operationName,
}) => {
  // Note: based on the operation name, we could configure the content types, max file size, etc

  const payload: UploadTokenPayload = {
    operationName,
    minFiles: 2,
    maxFiles: 5,
    expiresIn: 24 * 60 * 60,
    maxFileSize: 1 * 1024 * 1024, // 1MB
  }

  const token = createUploadToken(payload)

  return { token }
}
