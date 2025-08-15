
import { Router } from "express";
import { transparenciaService } from "../services/transparencia.service";
import { apiLimiter } from "../middleware/rateLimiter";

const router = Router();

router.use(apiLimiter);

router.get("/emendas", async (req, res, next) => {
  try {
    const params = {
      ano: req.query.ano as string,
      pagina: Number(req.query.pagina) || 1,
      codigoEmenda: req.query.codigoEmenda as string,
      codigoFuncao: req.query.codigoFuncao as string,
      codigoSubfuncao: req.query.codigoSubfuncao as string
    };
    const data = await transparenciaService.getEmendas(params);
    res.json(data);
  } catch (error: any) {
    next(error);
  }
});

router.get("/convenios", async (req, res, next) => {
  try {
    const params = {
      ano: req.query.ano as string,
      pagina: Number(req.query.pagina) || 1,
      numeroConvenio: req.query.numeroConvenio as string,
      uf: req.query.uf as string,
      municipio: req.query.municipio as string
    };
    const data = await transparenciaService.getConvenios(params);
    res.json(data);
  } catch (error: any) {
    next(error);
  }
});

export default router;
