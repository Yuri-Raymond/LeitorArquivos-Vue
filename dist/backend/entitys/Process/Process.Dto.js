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
const swagger_1 = require("@nestjs/swagger");
class ProcessDto {
    constructor(partial = {}) {
        this.id = partial.id ?? "";
        this.periodoInicio = partial.periodoInicio ?? "";
        this.periodoTermino = partial.periodoTermino ?? "";
        this.inicio = partial.inicio ?? new Date();
        this.termino = partial.termino ?? new Date();
        this.BondId = partial.BondId ?? "";
        this.ClassId = partial.ClassId ?? "";
        this.DisciplineId = partial.DisciplineId ?? "";
        this.UserId = partial.UserId ?? "";
    }
}
exports.ProcessDto = ProcessDto;
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, { message: 'Id do processo deve conter apenas caracteres alfanuméricos.' }),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'e3e03e39ie3jroefj484fd5gd84' }),
    __metadata("design:type", String)
], ProcessDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '1°' }),
    __metadata("design:type", String)
], ProcessDto.prototype, "periodoInicio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '9°' }),
    __metadata("design:type", String)
], ProcessDto.prototype, "periodoTermino", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({ example: '2025-04-23T10:30:00.000Z' }),
    __metadata("design:type", Date)
], ProcessDto.prototype, "inicio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({ example: '2025-04-23T10:30:00.000Z' }),
    __metadata("design:type", Date)
], ProcessDto.prototype, "termino", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '1597326' }),
    __metadata("design:type", String)
], ProcessDto.prototype, "BondId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'f1ds5fsg8sd5' }),
    __metadata("design:type", String)
], ProcessDto.prototype, "ClassId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'asd88a4a5e8f6d2' }),
    __metadata("design:type", String)
], ProcessDto.prototype, "DisciplineId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '1597326' }),
    __metadata("design:type", String)
], ProcessDto.prototype, "UserId", void 0);
