import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto, FilterClientsDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}
  async create(payload: CreateClientDto) {
    const newClient = await new this.clientModel(payload);
    return newClient.save();
  }

  async findAll(params?: FilterClientsDto) {
    const { limit, offset } = params;
    if (limit && offset) {
      return await this.clientModel
        .find()
        .skip(offset * limit)
        .limit(limit)
        .exec();
    }
    return await this.clientModel.find().exec();
  }

  async findOne(id: string) {
    const client = await this.clientModel.findById(id).exec();
    if (!client) {
      throw new NotFoundException(`client ${id} not found`);
    }
    return client;
  }

  async update(id: string, payload: UpdateClientDto) {
    const client = await this.clientModel
      .findByIdAndUpdate(
        id,
        {
          $set: payload,
        },
        { new: true },
      )
      .exec();
    if (!client) {
      throw new NotFoundException(`client ${id} not found`);
    }
    return client;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
