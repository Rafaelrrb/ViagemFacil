import { Request, Response, NextFunction } from 'express'
import { ZodSchema, z } from 'zod'

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Valida o corpo da requisição
      schema.parse(req.body)

      // Se a validação passar, passa para o próximo middleware ou controlador
      next()
    } catch (error) {
      // Se houver erro de validação, formata a resposta de erro
      if (error instanceof z.ZodError) {
        // Construa uma descrição detalhada dos erros
        const errorDescription = error.errors
          .map(err => `Campo '${err.path.join('.')}' - ${err.message}`)
          .join(', ')

        res.status(400).json({
          error_code: 'INVALID_DATA',
          error_description: errorDescription
        })

        return
      }

      // Se o erro não for de validação, passa para o próximo middleware de erro
      next(error)
    }
  }
