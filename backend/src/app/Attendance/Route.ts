import { Router } from "express";
import attendanceController from "./Controller";

const router = Router();
const controller = new attendanceController();

// router.route("/").post(controller.checkIn).post(controller.checkOut)
router.route("/checkIn").post(controller.checkIn)
router.route("/checkOut").post(controller.checkOut)
// .route("/:id")
// .get(controller.getOne)
// .put(controller.update)
// .delete(controller.delete);

export default router