import { Router } from "express";
import employeeController from "./Controller";

const router = Router();
const controller = new employeeController();

router.route("/").get(controller.get).post(controller.post)
router
    .route("/:id")
    .get(controller.getOne)
    .put(controller.update)
    .delete(controller.delete);

export default router