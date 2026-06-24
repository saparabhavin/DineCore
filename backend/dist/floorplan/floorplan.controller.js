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
exports.FloorplanController = void 0;
const common_1 = require("@nestjs/common");
const floorplan_service_1 = require("./floorplan.service");
const table_entity_1 = require("./table.entity");
let FloorplanController = class FloorplanController {
    floorplanService;
    constructor(floorplanService) {
        this.floorplanService = floorplanService;
    }
    getTables() {
        return this.floorplanService.getTables();
    }
    createTable(body) {
        return this.floorplanService.createTable(body.tableNumber, body.capacity);
    }
    updateTableStatus(id, status) {
        return this.floorplanService.updateTableStatus(id, status);
    }
};
exports.FloorplanController = FloorplanController;
__decorate([
    (0, common_1.Get)('tables'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FloorplanController.prototype, "getTables", null);
__decorate([
    (0, common_1.Post)('tables'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FloorplanController.prototype, "createTable", null);
__decorate([
    (0, common_1.Put)('tables/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FloorplanController.prototype, "updateTableStatus", null);
exports.FloorplanController = FloorplanController = __decorate([
    (0, common_1.Controller)('floorplan'),
    __metadata("design:paramtypes", [floorplan_service_1.FloorplanService])
], FloorplanController);
//# sourceMappingURL=floorplan.controller.js.map