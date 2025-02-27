import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Users } from '../entities/users.entity';
import { CreateUsersDto, UpdateUsersDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(Users.name) private userstModel: Model<Users>,
    ) { }

    getAll() {
        return !this.userstModel.find().exec() ? { message: "Sin usarios para listar" } : this.userstModel.find().exec();
    }

    async create(data: CreateUsersDto): Promise<Users | {}> {

        const email = data.email
        const user = await this.userstModel.findOne({ email }).exec();
        if (!user) {
            const createUser = new this.userstModel(data);
            return createUser.save();
        }
        return { menssage: "No se puede crear ya existe" };
    }

    async findId(id: string): Promise<Users | number> {
        const user = await this.userstModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException(`Usuario ${id} no found`);
        }
        return user;

    }

    async findByEmail(email: string) {
        const user = await this.userstModel.find({ email }).exec();
        if (!user) {
            throw new NotFoundException(`Usuario ${email} no found`);
        }
        return user;
    }

    async update(id: string, changes: UpdateUsersDto, type: string): Promise<Boolean> {

        if (type == "Egreso") {
            const user = await this.userstModel.findById(id).exec();
            const saldo = !user?.balance ? 0 : user?.balance;
            const movi = !changes.balance ? 0 : changes.balance;
            const resultado = (saldo - movi);
            console.log(resultado)
            if (resultado < 0) {
                return false;
            } else {
                this.actualizaSaldo(id, { balance: resultado })
                return true;
            }
        } else if (type == 'Ingreso') {
            const user = await this.userstModel.findById(id).exec();
            const saldo = !user?.balance ? 0 : user?.balance;
            const movi = !changes.balance ? 0 : changes.balance;
            const resultado = (saldo + movi);
            this.actualizaSaldo(id, { balance: resultado })
            return true;
        }
        return false;


    }

    async actualizaSaldo(id: string, data: UpdateUsersDto) {

        const updateUser = await this.userstModel.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
        if (!updateUser) {
            throw new NotFoundException(`Movement ${id} no found`);
        } else {
            return id;
        }

    }

    async validDelete(id: string, changes: UpdateUsersDto, type: string): Promise<Boolean> {

        const user = await this.userstModel.findById(id).exec();
        const saldo = !user?.balance ? 0 : user?.balance;
        const movi = !changes.balance ? 0 : changes.balance;
        const resultado = (saldo - movi);
        const newsaldo = (saldo + movi)
        if (type == "Ingreso") {
            if (resultado >= 0) {
                this.actualizaSaldo(id, { balance: resultado })
                return true;
            } else {
                return false;
            };
        };
        this.actualizaSaldo(id, { balance: newsaldo });
        return true;
    };


}
