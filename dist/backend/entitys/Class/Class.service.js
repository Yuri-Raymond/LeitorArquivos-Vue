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
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Class_schema_1 = require("./Class.schema"); // Substitua com o seu esquema real
let ClassService = class ClassService {
    constructor(ClassModel) {
        this.ClassModel = ClassModel;
    }
    async create(data) {
        const newClass = new this.ClassModel(data);
        return await newClass.save();
    }
    async findAll() {
        return await this.ClassModel.find().exec();
    }
    async findById(id) {
        const Class = await this.ClassModel.findById(id).exec();
        if (!Class) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return Class;
    }
    async update(id, data) {
        const updatedClass = await this.ClassModel
            .findByIdAndUpdate(id, data, { new: true })
            .exec();
        if (!updatedClass) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return updatedClass;
    }
    async delete(id) {
        const deletedClass = await this.ClassModel.findByIdAndDelete(id).exec();
        if (!deletedClass) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return deletedClass;
    }
};
exports.ClassService = ClassService;
exports.ClassService = ClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Class_schema_1.Class.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClassService);
