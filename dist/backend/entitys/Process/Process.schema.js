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
exports.ProcessSchema = exports.Process = void 0;
// Importando os módulos necessários
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Process = class Process extends mongoose_2.Document {
    constructor(id, periodoInicio, periodoTermino, inicio, termino, BondId, ClassId, DisciplineId, UserId) {
        super();
        this.id = id;
        this.periodoInicio = periodoInicio;
        this.periodoTermino = periodoTermino;
        this.inicio = inicio;
        this.termino = termino;
        this.BondId = BondId;
        this.ClassId = ClassId;
        this.DisciplineId = DisciplineId;
        this.UserId = UserId;
    }
};
exports.Process = Process;
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true }),
    __metadata("design:type", String)
], Process.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Process.prototype, "periodoInicio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Process.prototype, "periodoTermino", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Process.prototype, "inicio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Process.prototype, "termino", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Process.prototype, "BondId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Process.prototype, "ClassId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Process.prototype, "DisciplineId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Process.prototype, "UserId", void 0);
exports.Process = Process = __decorate([
    (0, mongoose_1.Schema)({ collection: 'Process' }),
    __metadata("design:paramtypes", [String, String, String, Date, Date, String, String, String, String])
], Process);
exports.ProcessSchema = mongoose_1.SchemaFactory.createForClass(Process);
