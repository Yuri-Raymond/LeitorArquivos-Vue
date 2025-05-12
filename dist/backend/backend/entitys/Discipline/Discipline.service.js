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
exports.DisciplineService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Discipline_schema_1 = require("./Discipline.schema"); // Substitua com o seu esquema real
let DisciplineService = class DisciplineService {
    constructor(DisciplineModel) {
        this.DisciplineModel = DisciplineModel;
    }
    async create(data) {
        const newDiscipline = new this.DisciplineModel(data);
        return await newDiscipline.save();
    }
    async findAll() {
        return this.DisciplineModel.find().exec();
    }
    async findById(matricula) {
        const Discipline = await this.DisciplineModel.findById(matricula).exec();
        if (!Discipline) {
            throw new common_1.NotFoundException(`Registro com ID ${matricula} não encontrado`);
        }
        return Discipline;
    }
    async findByMatricula(matricula) {
        const Discipline = await this.DisciplineModel.findOne({ matricula }).exec();
        if (!Discipline) {
            throw new common_1.NotFoundException(`Registro com matrícula ${matricula} não encontrado`);
        }
        return Discipline;
    }
    async update(matricula, data) {
        const existingDiscipline = await this.DisciplineModel.findById(matricula).exec();
        if (!existingDiscipline) {
            throw new common_1.NotFoundException(`Registro com ID ${matricula} não encontrado`);
        }
        Object.assign(existingDiscipline, data); // Atualiza os campos do documento com os novos valores
        return await existingDiscipline.save(); // Persiste as alterações, validando os campos automaticamente
    }
    async delete(matricula) {
        const deletedDiscipline = await this.DisciplineModel.findByIdAndDelete(matricula).exec();
        if (!deletedDiscipline) {
            throw new common_1.NotFoundException(`Registro com ID ${matricula} não encontrado`);
        }
        return deletedDiscipline;
    }
};
exports.DisciplineService = DisciplineService;
exports.DisciplineService = DisciplineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Discipline_schema_1.Discipline.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DisciplineService);
