"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const institutionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: null
    },
    img: {
        type: String,
        default: null
    }
}, {
    timestamps: true, // enable timestamps
    versionKey: false // disable __v
});
const Institution = (0, mongoose_1.model)('Institution', institutionSchema);
exports.default = Institution;
//# sourceMappingURL=Institution.js.map