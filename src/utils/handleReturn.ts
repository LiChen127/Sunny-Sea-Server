import { Response } from 'express';

export const handleReturn = (code: number, data: any, message: string, res: Response) => {
  res.status(code).json({
    code,
    data,
    message
  })
}
