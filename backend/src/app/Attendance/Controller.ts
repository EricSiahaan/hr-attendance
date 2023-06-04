import { Request, Response, NextFunction } from "express";
import { PrismaClient, attendance } from "@prisma/client";

const prisma = new PrismaClient();


class Attendance {
    async checkIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nik, namaKaryawan } = req.body;
            if (!nik) {
                throw new Error("Missing 'nik' in request body.");
            }

            const checkInTime = new Date();

            const attendance: attendance = await prisma.attendance.create({
                data: {
                    nik: String(nik),
                    namaKaryawan: namaKaryawan,
                    checkIn: checkInTime,
                },
            });
            res.status(200).json(attendance)
        } catch (error) {
            next(error)
        }
    }

    async checkOut(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const checkOutTime = new Date();
            const attendance: attendance | null = await prisma.attendance.update({
                where: {

                },
                data: {
                    checkOut: checkOutTime,

                },
            });

            if (attendance) {
                res.status(200).json(attendance)
            } else {
                res.status(404).json({ message: "Employee not found" })
            }

        } catch (error) {
            next(error)
        }
    }
}
export default Attendance

