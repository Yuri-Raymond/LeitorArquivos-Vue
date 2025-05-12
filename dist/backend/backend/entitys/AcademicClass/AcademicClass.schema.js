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
exports.AcademicClassSchema = exports.AcademicClass = void 0;
// Importando os módulos necessários
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AcademicClass = class AcademicClass extends mongoose_2.Document {
    constructor(id, school_period_id, name, code, start_date, end_date, category, course, active, is_exceptional, period, campus_id, integration, created_at, updated_at, deleted_at) {
        super();
        this.id = id;
        this.school_period_id = school_period_id;
        this.name = name;
        this.code = code;
        this.start_date = start_date;
        this.end_date = end_date;
        this.category = category;
        this.course = course;
        this.active = active;
        this.is_exceptional = is_exceptional;
        this.period = period;
        this.campus_id = campus_id;
        this.integration = integration;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
};
exports.AcademicClass = AcademicClass;
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], AcademicClass.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], AcademicClass.prototype, "school_period_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], AcademicClass.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], AcademicClass.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], AcademicClass.prototype, "start_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], AcademicClass.prototype, "end_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], AcademicClass.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], AcademicClass.prototype, "course", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean }),
    __metadata("design:type", Boolean)
], AcademicClass.prototype, "active", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean }),
    __metadata("design:type", Boolean)
], AcademicClass.prototype, "is_exceptional", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], AcademicClass.prototype, "period", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], AcademicClass.prototype, "campus_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], AcademicClass.prototype, "integration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], AcademicClass.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], AcademicClass.prototype, "updated_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], AcademicClass.prototype, "deleted_at", void 0);
exports.AcademicClass = AcademicClass = __decorate([
    (0, mongoose_1.Schema)({ collection: 'AcademicClass' }),
    __metadata("design:paramtypes", [Number, Number, String, String, Date, Date, String, String, Boolean, Boolean, String, Number, String, Date, Date, Date])
], AcademicClass);
exports.AcademicClassSchema = mongoose_1.SchemaFactory.createForClass(AcademicClass);
