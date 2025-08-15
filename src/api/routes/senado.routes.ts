
import { Router } from "express";
import { senadoService } from "../services/senado.service";
import { apiLimiter } from "../middleware/rateLimiter";

const router = Router();

router.use(apiLimiter);

router.get("/senadores", async (req, res, next) => {
  try {
    const data = await senadoService.getSenadores();
    res.json({ dados: data });
  } catch (error: any) {
    next(error);
  }
});

router.get("/senadores/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await senadoService.getSenador(id);
      if(!data) {
        return res.status(404).json({ error: 'Senador não encontrado' });
      }
      res.json({ dados: data });
    } catch (error: any) {
      next(error);
    }
  });

export default router;
