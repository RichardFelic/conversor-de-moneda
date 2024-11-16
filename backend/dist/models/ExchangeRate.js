"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const exchangeRateSchema = new mongoose_1.Schema({
    currencyFrom: {
        type: String,
        required: true
    },
    currencyTo: {
        type: String,
        required: true
    },
    exchangeRate: {
        type: Number,
        required: true
    },
    update_date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true, // enable timestamps
    versionKey: false // disable __v
});
exchangeRateSchema.index({ currencyFrom: 1, currencyTo: 1 }, { unique: true });
const ExchangeRate = (0, mongoose_1.model)('ExchangeRate', exchangeRateSchema);
exports.default = ExchangeRate;
//# sourceMappingURL=ExchangeRate.js.map