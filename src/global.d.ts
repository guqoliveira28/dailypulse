export {};

declare global {
  type Nullable<T> = T | null;

  type pulseDay = {
    dayNumber: number;
    things: any[];
  };
}
