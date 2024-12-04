import { Request, NextFunction } from 'express'

const mapStingfiedArgsToNumeric = (args: string, delimiter = ',') =>
  args.split(delimiter).map(Number)

const modifyDinerQueryArgs = (
  req: Request<any, any, any, any>,
  _: unknown,
  next: NextFunction
) => {
  if (req.query.diners) {
    const {
      query: { diners: queryArgs }
    } = req

    req.query.diners = mapStingfiedArgsToNumeric(queryArgs)
  }
  next()
}

export default {
  modifyDinerQueryArgs
}
