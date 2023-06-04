import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface bodyType {
    name: string;
    departement: string;
}

class User {
    async get(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await prisma.user.findMany();

            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
    async post(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body = req.body as bodyType; //type casting
            const payload = {
                name: body.name,
                departement: body.departement,

            };
            const user = await prisma.user.create({
                data: payload,
            });

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string }; //type casting

            const user = await prisma.user.findUniqueOrThrow({
                where: {
                    id,
                },
            });

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };
            const body = req.body as bodyType;

            const payload = {
                name: body.name,
                departement: body.departement,
            };

            const user = await prisma.user.update({
                where: {
                    id,
                },
                data: payload,
            });

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };

            const user = await prisma.user.delete({
                where: {
                    id,
                },
            });

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}


export default User