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
exports.AcademicClassController = void 0;
const common_1 = require("@nestjs/common");
const AcademicClass_service_1 = require("./AcademicClass.service");
const AcademicClass_Dto_1 = require("./AcademicClass.Dto");
let AcademicClassController = class AcademicClassController {
    constructor(AcademicClassService) {
        this.AcademicClassService = AcademicClassService;
    }
    async create(data) {
        return this.AcademicClassService.create(data);
    }
    async findAll() {
        return this.AcademicClassService.findAll();
    }
    async findById(id) {
        return this.AcademicClassService.findById(id);
    }
    async update(id, data) {
        return this.AcademicClassService.update(id, data);
    }
    async delete(id) {
        return this.AcademicClassService.delete(id);
    }
};
exports.AcademicClassController = AcademicClassController;
__decorate([
    (0, common_1.Post)('Post'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicClass_Dto_1.AcademicClassDto]),
    __metadata("design:returntype", Promise)
], AcademicClassController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('Get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AcademicClassController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('Get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicClassController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)('Put/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicClassController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('Delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicClassController.prototype, "delete", null);
exports.AcademicClassController = AcademicClassController = __decorate([
    (0, common_1.Controller)('AcademicClass'),
    __metadata("design:paramtypes", [AcademicClass_service_1.AcademicClassService])
], AcademicClassController);
