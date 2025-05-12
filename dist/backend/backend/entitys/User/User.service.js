"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const User_schema_1 = require("./User.schema"); // Substitua com o seu esquema real
let UserService = class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async create(data) {
        const newUser = new this.UserModel(data);
        return await newUser.save();
    }
    async findAll() {
        return await this.UserModel.find().exec();
    }
    async findById(id) {
        const User = await this.UserModel.findById(id).exec();
        if (!User) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return User;
    }
    async update(id, data) {
        const updatedUser = await this.UserModel
            .findByIdAndUpdate(id, data, { new: true })
            .exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return updatedUser;
    }
    async delete(id) {
        const deletedUser = await this.UserModel.findByIdAndDelete(id).exec();
        if (!deletedUser) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return deletedUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
