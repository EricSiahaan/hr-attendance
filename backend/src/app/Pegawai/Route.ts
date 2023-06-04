import { Router } from "express";

import pegawaiController from "./Controller";
const controller = new pegawaiController();

const router = Router();

router.route('/').post(controller.tambahPegawai)
router.route('/').get(controller.semuaPegawai)

export default router