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
exports.AcademicClassService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const AcademicClass_schema_1 = require("./AcademicClass.schema"); // Substitua com o seu esquema real
let AcademicClassService = class AcademicClassService {
    constructor(AcademicClassModel) {
        this.AcademicClassModel = AcademicClassModel;
    }
    async create(data) {
        const newAcademicClass = new this.AcademicClassModel(data);
        return await newAcademicClass.save();
    }
    async findAll() {
        return await this.AcademicClassModel.find().exec();
    }
    async findById(id) {
        const AcademicClass = await this.AcademicClassModel.findById(id).exec();
        if (!AcademicClass) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return AcademicClass;
    }
    async update(id, data) {
        const updatedAcademicClass = await this.AcademicClassModel
            .findByIdAndUpdate(id, data, { new: true })
            .exec();
        if (!updatedAcademicClass) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return updatedAcademicClass;
    }
    async delete(id) {
        const deletedAcademicClass = await this.AcademicClassModel.findByIdAndDelete(id).exec();
        if (!deletedAcademicClass) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return deletedAcademicClass;
    }
};
exports.AcademicClassService = AcademicClassService;
exports.AcademicClassService = AcademicClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(AcademicClass_schema_1.AcademicClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AcademicClassService);
