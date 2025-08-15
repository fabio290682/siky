
import { Router } from "express";
import { ibgeService } from "../services/ibge.service";
import { apiLimiter } from "../middleware/rateLimiter";

const router = Router();

router.use(apiLimiter);

router.get("/estados", async (req, res, next) => {
    try {
      const data = await ibgeService.getEstados();
      res.json(data);
    } catch (error: any) {
      next(error);
    }
});

router.get("/municipios/:uf", async (req, res, next) => {
    try {
      const { uf } = req.params;
      const data = await ibgeService.getMunicipios(uf);
      res.json(data);
    } catch (error: any) {
      next(error);
    }
});

export default router;
