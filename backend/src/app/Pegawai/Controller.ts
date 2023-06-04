import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const tambahData = async (nama: string, email: string, password: string, peran: string) => {
    const salt = await bcrypt.genSalt(10);
    const passwordTerenkripsi = await bcrypt.hash(password, salt);


    const pegawaiBaru = await prisma.pegawai.create({
        data: {
            nama,
            email,
            password: passwordTerenkripsi,
            peran,
        },
    });

    return pegawaiBaru
}

class Pegawai {
    async tambahPegawai(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { nama, email, password, peran } = req.body;

        if (!nama || !email || !password) {
            res.status(400).json({ message: "Nama, email dan password harus disertakan" })
        }
        try {
            const cekEmail = await prisma.pegawai.findUnique({
                where: { email }
            })
            if (cekEmail) {
                res.status(400).json({ message: " Email sudah digunakan" })
            }

            const pegawaiBaru = await tambahData(nama, email, password, peran)
            res.status(201).json(pegawaiBaru)
        } catch (error) {
            next(error)
            res.status(500).json({ message: " Gagal Menambahkan pegawai" })
        }

    } async semuaPegawai(req: Request, res: Response, next: NextFunction) {
        try {
            const halaman = parseInt(req.query.halaman as string) || 1;
            const dataPerhalaman = 10;

            const totalDocument = await prisma.pegawai.count();
            const totalHalaman = Math.ceil(totalDocument / dataPerhalaman)
            const skip = (halaman - 1) * dataPerhalaman;

            const data = await prisma.pegawai.findMany({
                skip,
                take: dataPerhalaman,
                select: {
                    nama: true,
                    email: true,
                    peran: true,
                },
                orderBy: {
                    nama: 'asc'
                },
            });
            res.status(200).json({ data, halaman, totalHalaman })
        } catch (error) {
            next(error)
        }
    }

}

export default Pegawai
