export {};

declare global {
  type Nullable<T> = T | null;

  type PulseDay = {
    id: number;
    date: Date;
    pulses: Pulse[];
  };

  type Pulse = {
    id: number;
    name: string;
    color: string;
  };
}
