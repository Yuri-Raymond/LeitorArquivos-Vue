"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicClassModule = void 0;
const common_1 = require("@nestjs/common");
const AcademicClass_controller_1 = require("./AcademicClass.controller");
const AcademicClass_service_1 = require("./AcademicClass.service");
const mongoose_1 = require("@nestjs/mongoose");
const AcademicClass_schema_1 = require("./AcademicClass.schema");
let AcademicClassModule = class AcademicClassModule {
};
exports.AcademicClassModule = AcademicClassModule;
exports.AcademicClassModule = AcademicClassModule = __decorate([
    (0, common_1.Module)({
        controllers: [AcademicClass_controller_1.AcademicClassController], // Lista de controladores do módulo
        providers: [AcademicClass_service_1.AcademicClassService], // Lista de provedores (serviços, guardas, etc.)
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: AcademicClass_schema_1.AcademicClass.name, schema: AcademicClass_schema_1.AcademicClassSchema }]),
        ], // Outros módulos que este módulo precisa
        exports: [AcademicClass_service_1.AcademicClassService], // Provedores que podem ser usados por outros módulos
    })
], AcademicClassModule);
