export {};

declare global {
  type Nullable<T> = T | null;

  type pulseDay = {
    id: number;
    dayNumber: number;
    pulses: pulse[];
  };

  type pulse = {
    id: number;
    name: string;
    color: string;
  };
}
