import { useState } from 'react';
import { DatePicker } from '@mantine/dates';

export default function Datepicker() {
    const [pickupDate, setPickupDate] = useState<Date | null>(null);
    return (
      <DatePicker
        id="pickup-date"
        value={pickupDate}
        onChange={setPickupDate}
      />
    );
  }