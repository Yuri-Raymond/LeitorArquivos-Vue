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
exports.AcademicClassDto = void 0;
const class_validator_1 = require("class-validator");
class AcademicClassDto {
    constructor(partial = {}) {
        this.id = partial.id ?? 0;
        this.school_period_id = partial.school_period_id ?? 0;
        this.name = partial.name ?? '';
        this.code = partial.code ?? '';
        this.start_date = partial.start_date ?? new Date();
        this.end_date = partial.end_date ?? new Date();
        this.category = partial.category ?? '';
        this.course = partial.course ?? '';
        this.active = partial.active ?? false;
        this.is_exceptional = partial.is_exceptional ?? false;
        this.period = partial.period ?? '';
        this.campus_id = partial.campus_id ?? 0;
        this.integration = partial.integration ?? '';
        this.created_at = partial.created_at ?? new Date();
        this.updated_at = partial.updated_at ?? new Date();
        this.deleted_at = partial.deleted_at ?? new Date();
    }
}
exports.AcademicClassDto = AcademicClassDto;
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "O ID deve ser um número" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], AcademicClassDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "O Período Escolar deve ser um número" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AcademicClassDto.prototype, "school_period_id", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "O Nome deve ser uma String" }),
    __metadata("design:type", String)
], AcademicClassDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "O Código deve ser uma String" }),
    __metadata("design:type", String)
], AcademicClassDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AcademicClassDto.prototype, "start_date", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AcademicClassDto.prototype, "end_date", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "A Categoria deve ser uma String" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AcademicClassDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "O Curso deve ser uma String" }),
    __metadata("design:type", String)
], AcademicClassDto.prototype, "course", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "O Período deve ser uma String" }),
    __metadata("design:type", String)
], AcademicClassDto.prototype, "period", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "O Campus_Id deve ser um número" }),
    __metadata("design:type", Number)
], AcademicClassDto.prototype, "campus_id", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "A integração deve ser uma String" }),
    __metadata("design:type", String)
], AcademicClassDto.prototype, "integration", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AcademicClassDto.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AcademicClassDto.prototype, "updated_at", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AcademicClassDto.prototype, "deleted_at", void 0);
