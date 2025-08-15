
import { Router } from "express";
import transparenciaRoutes from "./transparencia.routes";
import senadoRoutes from "./senado.routes";
import camaraRoutes from "./camara.routes";
import ibgeRoutes from "./ibge.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

router.use("/transparencia", transparenciaRoutes);
router.use("/senado", senadoRoutes);
router.use("/camara", camaraRoutes);
router.use("/ibge", ibgeRoutes);

export default router;
