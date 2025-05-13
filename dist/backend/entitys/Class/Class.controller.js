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
exports.ClassController = void 0;
const common_1 = require("@nestjs/common");
const Class_service_1 = require("./Class.service");
const Class_Dto_1 = require("./Class.Dto");
let ClassController = class ClassController {
    constructor(ClassService) {
        this.ClassService = ClassService;
    }
    async create(data) {
        return this.ClassService.create(data);
    }
    async findAll() {
        return this.ClassService.findAll();
    }
    async findUnique(codigo) {
        return this.ClassService.findByCodigo(codigo);
    }
    async update(codigo, data) {
        return this.ClassService.update(codigo, data);
    }
    async delete(codigo) {
        return this.ClassService.delete(codigo);
    }
};
exports.ClassController = ClassController;
__decorate([
    (0, common_1.Post)('Post'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Class_Dto_1.ClassDto]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('Get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('Get/:codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "findUnique", null);
__decorate([
    (0, common_1.Put)('Put/:codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Class_Dto_1.ClassDto]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('Delete/:codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "delete", null);
exports.ClassController = ClassController = __decorate([
    (0, common_1.Controller)('Class'),
    __metadata("design:paramtypes", [Class_service_1.ClassService])
], ClassController);
