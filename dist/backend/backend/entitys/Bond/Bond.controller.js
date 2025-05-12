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
exports.BondController = void 0;
const common_1 = require("@nestjs/common");
const Bond_service_1 = require("./Bond.service");
const Bond_Dto_1 = require("./Bond.Dto");
let BondController = class BondController {
    constructor(BondService) {
        this.BondService = BondService;
    }
    async create(data) {
        return this.BondService.create(data);
    }
    async findAll() {
        return this.BondService.findAll();
    }
    async findById(id) {
        return this.BondService.findById(id);
    }
    async update(id, data) {
        return this.BondService.update(id, data);
    }
    async delete(id) {
        return this.BondService.delete(id);
    }
};
exports.BondController = BondController;
__decorate([
    (0, common_1.Post)('Post'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Bond_Dto_1.BondDto]),
    __metadata("design:returntype", Promise)
], BondController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('Get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BondController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('Get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BondController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)('Put/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Bond_Dto_1.BondDto]),
    __metadata("design:returntype", Promise)
], BondController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('Delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BondController.prototype, "delete", null);
exports.BondController = BondController = __decorate([
    (0, common_1.Controller)('Bond'),
    __metadata("design:paramtypes", [Bond_service_1.BondService])
], BondController);
