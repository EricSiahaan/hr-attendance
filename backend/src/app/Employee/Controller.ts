import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface bodyType {
    nik: string;
    namaLengkap: string;
    alamat: string;
    nomorHandphone: string;
    email: string;
    tempatLahir: string;
    agama: string;
    statusPerkawinan: string;
    noKtp: number;
}

class Employee {
    async get(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const employees = await prisma.employee.findMany();

            res.status(200).json(employees)
        } catch (error) {
            next(error)
        }
    }

    async post(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body = req.body as bodyType;

            const payload = {
                NIK: body.nik,
                NamaLengkap: body.namaLengkap,
                Alamat: body.alamat,
                NomorHandphone: body.nomorHandphone,
                Email: body.email,
                TempatLahir: body.tempatLahir,
                Agama: body.agama,
                StatusPerkawinan: body.statusPerkawinan,
                NoKTP: body.noKtp,
            };
            const employee = await prisma.employee.create({
                data: payload
            });

            res.status(200).json(employee)
        } catch (error) {
            next(error)
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const employee = await prisma.employee.findUnique({
                where: {
                    NIK: id,
                },
            });

            if (employee) {
                res.status(200).json(employee);
            } else {
                res.status(404).json({ message: "Employee not found" });
            }
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };
            const body = req.body as bodyType;

            const payload = {
                NIK: body.nik,
                NamaLengkap: body.namaLengkap,
                Alamat: body.alamat,
                NomorHandphone: body.nomorHandphone,
                Email: body.email,
                TempatLahir: body.tempatLahir,
                Agama: body.agama,
                StatusPerkawinan: body.statusPerkawinan,
                NoKTP: body.noKtp,
            }

            const employee = await prisma.employee.update({
                where: {
                    NIK: id,
                },
                data: payload,
            });
            if (employee) {
                res.status(200).json(employee);
            } else {
                res.status(404).json({ message: "Employee tidak ditemukan" });
            }

        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };
            const employee = await prisma.employee.delete({
                where: {
                    NIK: id
                }
            })
            res.status(200).json({
                employee,
                message: "Data Telah Di hapus"
            })
        } catch (error) {
            next(error)
        }
    }
}

export default Employee