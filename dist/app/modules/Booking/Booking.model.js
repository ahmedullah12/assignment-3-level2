"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    date: { type: String, required: true },
    slots: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Slot', required: true }],
    room: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Room', required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    totalAmount: { type: Number, required: true },
    isConfirmed: {
        type: String,
        enum: ['confirmed', 'unconfirmed', 'canceled'],
        default: 'unconfirmed',
    },
    isDeleted: { type: Boolean, default: false },
});
bookingSchema.pre('find', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
bookingSchema.statics.isBookingExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exports.Booking.findById(id);
        return result;
    });
};
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
