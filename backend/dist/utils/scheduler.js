"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteInactiveUsers_1 = require("./deleteInactiveUsers");
const scheduler = () => {
    setInterval(() => {
        (0, deleteInactiveUsers_1.deleteInactiveUsers)();
    }, 60000); // 60000 milisegundos = 1 minuto
};
scheduler();
//# sourceMappingURL=scheduler.js.map