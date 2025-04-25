export interface Container {
  id: string;
  size: 'small' | 'big';
  needsCold: boolean;
  x: number;
  y: number;
}

export interface YardSlot {
  x: number;
  y: number;
  sizeCap: 'small' | 'big';
  hasColdUnit: boolean;
  occupied: boolean;
}

export interface PlacementRequest {
  container: Container;
  yardMap: YardSlot[];
}

export interface SuccessResponse {
  containerId: string;
  targetX: number;
  targetY: number;
}

export interface ErrorResponse {
  error: string;
}

export type PlacementResponse = SuccessResponse | ErrorResponse;

export interface SlotScore {
  slot: YardSlot;
  distance: number;
  sizePenalty: number;
  coldPenalty: number;
  occupiedPenalty: number;
  totalScore: number;
}