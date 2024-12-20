"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const conversionSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: true
    },
    currencyFrom: {
        type: String,
        required: true
    },
    currencyTo: {
        type: String,
        required: true
    },
    result: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    exchange_rate_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'ExchangeRate'
    },
    institution_exchange_rate_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'InstitutionExchangeRate'
    }
}, {
    timestamps: true, // enable timestamps
    versionKey: false // disable __v
});
const Conversion = (0, mongoose_1.model)('Conversion', conversionSchema);
exports.default = Conversion;
//# sourceMappingURL=Conversion.js.map