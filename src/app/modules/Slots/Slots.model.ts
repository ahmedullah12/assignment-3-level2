import { Schema, model } from 'mongoose';
import { SlotsModel, TSlots } from './Slots.interface';

const slotsSchema = new Schema<TSlots>({
  room: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Room',
  },
  date: {
    type: String,
    required: true,
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  isDeleted: {type: Boolean, default: false}
});



slotsSchema.statics.isSlotExists = async function(id: string){
  const slot = await Slot.findById(id);
  return slot;
}


slotsSchema.statics.validateTimeDifference = async function (payload: TSlots) {
  const { startTime, endTime } = payload;

  // Convert start and end times to Date objects
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startDate = new Date(0, 0, 0, startHour, startMinute);
  const endDate = new Date(0, 0, 0, endHour, endMinute);

  // Calculate the difference in hours
  const diffHours =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

  // Check if the difference is a whole number between 1 and 24
  return diffHours >= 1 && diffHours <= 24 && Number.isInteger(diffHours);
};

slotsSchema.statics.slotsCounts = async function (payload: TSlots) {
  const { startTime, endTime } = payload;
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  // Calculate total duration in minutes
  const totalDuration = endMinutes - startMinutes;

  // Calculate the number of slots (assuming each slot is 1 hour)
  const slotDuration = 60; // 1 hour in minutes
  const numberOfSlots = Math.floor(totalDuration / slotDuration);

  return numberOfSlots;
};

export const Slot = model<TSlots, SlotsModel>('Slot', slotsSchema);
