"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorplanModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const table_entity_1 = require("./table.entity");
const floorplan_service_1 = require("./floorplan.service");
const floorplan_controller_1 = require("./floorplan.controller");
let FloorplanModule = class FloorplanModule {
};
exports.FloorplanModule = FloorplanModule;
exports.FloorplanModule = FloorplanModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([table_entity_1.DineTable])],
        providers: [floorplan_service_1.FloorplanService],
        controllers: [floorplan_controller_1.FloorplanController],
    })
], FloorplanModule);
//# sourceMappingURL=floorplan.module.js.map