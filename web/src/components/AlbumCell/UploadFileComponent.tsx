import React, { useCallback, useState } from 'react'

import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'

import { toast } from '@redwoodjs/web/toast'

type UploadFileComponentProps = {
  onFileAccepted: (files: File[]) => void
  maxFiles?: number
  acceptedFileTypes?: Record<string, string[]>
  children?: React.ReactNode
  onDropEvent?: (event: DropEvent) => void
  onDropRejected?: (rejectedFiles: FileRejection[]) => void
  dropzoneContent?: React.ReactNode
  dropActiveContent?: React.ReactNode
  uploadButtonContent?: React.ReactNode
  className?: string
  showPreviews?: boolean
}

export const imageFileTypes = {
  'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
}

type Preview = {
  file: File
  previewUrl: string
}

const UploadFileComponent = ({
  onFileAccepted,
  maxFiles = 20,
  acceptedFileTypes = imageFileTypes,
  children,
  dropzoneContent = <p>Drag n drop some files here</p>,
  dropActiveContent = <p>Drop the files here ...</p>,
  uploadButtonContent = <span>Click to upload</span>,
  className = 'm-4 rounded-lg border-2 border-dashed border-gray-300 p-4 text-center',
  showPreviews = false,
}: UploadFileComponentProps) => {
  const [previews, setPreviews] = useState<Preview[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: File[]) => {
      if (rejectedFiles.length > 0) {
        if (rejectedFiles.length > maxFiles) {
          toast.error(`You can only upload up to ${maxFiles} files at a time`)
        } else {
          const nonAcceptedFiles = rejectedFiles.filter(
            (file) =>
              !Object.keys(acceptedFileTypes).some((type) =>
                file.type.startsWith(type)
              )
          )
          if (nonAcceptedFiles.length > 0) {
            toast.error('Some files are not of the accepted type')
          }
        }
        return
      }

      const newPreviews = acceptedFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }))
      setPreviews((prev) => [...prev, ...newPreviews])
      onFileAccepted(acceptedFiles)
    },
    [maxFiles, acceptedFileTypes, onFileAccepted]
  )

  const removePreview = (index: number) => {
    setPreviews((prev) => {
      const newPreviews = [...prev]
      URL.revokeObjectURL(newPreviews[index].previewUrl)
      newPreviews.splice(index, 1)
      return newPreviews
    })
  }

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      const rejectedFiles = fileRejections.map((rejection) => rejection.file)
      onDrop(acceptedFiles, rejectedFiles)

      // Handle the event if needed
      if (event.type === 'drop') {
        console.log('Files were dropped')
        // You can access event properties like event.target, event.preventDefault(), etc.
      }
    },
    accept: acceptedFileTypes,
    maxFiles,
    noClick: true,
  })

  const renderPreviews = () => {
    if (!showPreviews || previews.length === 0) return null

    return (
      <div className="mt-4 flex flex-row flex-wrap gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative">
            <img
              src={preview.previewUrl}
              alt={`Preview ${index + 1}`}
              className="h-32 w-32 rounded object-cover"
            />
            <button
              onClick={() => removePreview(index)}
              className="absolute right-0 top-0 m-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
              type="button"
            >
              X
            </button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div {...getRootProps()} className={`${className}`}>
      <input {...getInputProps()} />
      {isDragActive ? (
        dropActiveContent
      ) : (
        <>
          {dropzoneContent}
          {children}
        </>
      )}

      <button className="font-inherit cursor-pointer" onClick={open}>
        {uploadButtonContent}
      </button>

      {renderPreviews()}
    </div>
  )
}

export default UploadFileComponent
