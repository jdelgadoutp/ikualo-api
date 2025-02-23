import { Injectable, NotFoundException, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';


import { Movements } from '../entities/movements.entity';
import { CreateMomeventsDto, UpdateMomeventsDto } from '../dtos/movements.dto';

@Injectable()
export class MovementsService {

  constructor(
    @InjectModel(Movements.name) private movementModel: Model<Movements>,
  ) { }

  async findAll(): Promise<Movements[]> {
    return this.movementModel.find().populate('user').exec();
  }

  async findOne(id: string): Promise<Movements> {
    const movements = await this.movementModel.findById(id).exec();
    if (!movements) {
      throw new NotFoundException(`Movement ${id} no found`);
    }
    return movements;
  }

  async create(data: CreateMomeventsDto): Promise<Movements> {
    const createMovement = new this.movementModel(data);
    return createMovement.save();
  }

  async update(id: string, changes: UpdateMomeventsDto): Promise<Movements> {
    const updateMovement = await this.movementModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec();
    if (!updateMovement) {
      throw new NotFoundException(`Movement ${id} no found`);
    } else {
      return updateMovement;
    }
  }

  async delete(id: string){
    return await this.movementModel.findByIdAndDelete(id).exec();
  }

  async findByUser(user: string){
    return await this.movementModel.find({user}).populate('user').exec();
  }
}
