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
exports.ClassDto = void 0;
const class_validator_1 = require("class-validator");
class ClassDto {
    constructor(partial = {}) {
        this.turma = partial.turma ?? "";
        this.codigo = partial.codigo ?? "";
        this.disciplina = partial.disciplina ?? "";
        this.turno = partial.turno ?? "";
        this.capacidade = partial.capacidade ?? 0;
        this.inicio = partial.inicio ?? new Date();
        this.termino = partial.termino ?? new Date();
        this.professor = partial.professor ?? "";
        this.status = partial.status ?? "";
    }
}
exports.ClassDto = ClassDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClassDto.prototype, "turma", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, { message: 'Código deve conter apenas caracteres alfanuméricos.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClassDto.prototype, "codigo", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-zÀ-ÿ0-9\s]+$/, { message: 'Disciplina deve conter apenas letras, números e espaços.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClassDto.prototype, "disciplina", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClassDto.prototype, "turno", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ClassDto.prototype, "capacidade", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ClassDto.prototype, "inicio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ClassDto.prototype, "termino", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClassDto.prototype, "professor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClassDto.prototype, "status", void 0);
