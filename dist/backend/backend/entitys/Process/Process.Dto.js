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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDto = void 0;
const class_validator_1 = require("class-validator");
class ProcessDto {
    constructor(partial = {}) {
        this.id = partial.id ?? "";
        this.BondId = partial.BondId ?? "";
        this.ClassId = partial.ClassId ?? "";
        this.DisciplineId = partial.DisciplineId ?? "";
        this.UserMtr = partial.UserMtr ?? 0;
        this.DataInicio = partial.DataInicio ?? new Date();
        this.DataTermino = partial.DataTermino ?? new Date();
        this.StatusEnvio = partial.StatusEnvio ?? "";
        this.Acoes = partial.Acoes ?? "";
    }
}
exports.ProcessDto = ProcessDto;
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, { message: 'Id do processo deve conter apenas caracteres alfanuméricos.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcessDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, { message: 'Código do vínculo deve conter apenas caracteres alfanuméricos.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcessDto.prototype, "BondId", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, { message: 'Código da turma deve conter apenas caracteres alfanuméricos.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcessDto.prototype, "ClassId", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, { message: 'Código da disciplina deve conter apenas caracteres alfanuméricos.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcessDto.prototype, "DisciplineId", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^\d{6,12}$/, { message: 'Matrícula deve conter entre 6 e 12 dígitos numéricos.' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProcessDto.prototype, "UserMtr", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ProcessDto.prototype, "DataInicio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ProcessDto.prototype, "DataTermino", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcessDto.prototype, "StatusEnvio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcessDto.prototype, "Acoes", void 0);
