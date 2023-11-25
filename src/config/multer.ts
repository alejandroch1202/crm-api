import type { Request } from 'express'
import multer, { type FileFilterCallback } from 'multer'
import { generateId } from '../utils/token'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const fileStorage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, __dirname + './../../uploads/')
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    const extension = file.mimetype.split('/')[1]
    callback(null, `${generateId()}.${extension}`)
  }
})
const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

const upload = multer({ storage: fileStorage, fileFilter }).single('image')

export { upload }
