import { Router } from "express";
import userController from "./Controller";

const router = Router();
const controller = new userController();

router.route("/").get(controller.get).post(controller.post);
router
    .route("/:id")
    .get(controller.getOne)
    .put(controller.update)
    .delete(controller.delete);

export default router