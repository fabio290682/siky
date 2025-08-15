
import { Router } from "express";
import { camaraService } from "../services/camara.service";
import { apiLimiter } from "../middleware/rateLimiter";

const router = Router();

router.use(apiLimiter);

router.get("/deputados", async (req, res, next) => {
  try {
    const data = await camaraService.getDeputados();
    res.json(data);
  } catch (error: any) {
    next(error);
  }
});

router.get("/deputados/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await camaraService.getDeputadoDetalhes(id);
      res.json(data);
    } catch (error: any) {
      next(error);
    }
});

router.get("/deputados/:id/despesas", async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await camaraService.getDespesasDeputado(id);
        res.json(data);
    } catch (error: any) {
        next(error);
    }
});

router.get("/deputados/:id/orgaos", async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await camaraService.getOrgaosDeputado(id);
        res.json(data);
    } catch (error: any) {
        next(error);
    }
});

router.get("/deputados/:id/frentes", async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await camaraService.getFrentesDeputado(id);
        res.json(data);
    } catch (error: any) {
        next(error);
    }
});

router.get("/partidos", async (req, res, next) => {
    try {
      const data = await camaraService.getPartidos();
      res.json(data);
    } catch (error: any) {
      next(error);
    }
  });


export default router;
