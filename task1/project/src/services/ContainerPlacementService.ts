import { Container, YardSlot, PlacementRequest, PlacementResponse, SlotScore } from '../types';

export class ContainerPlacementService {
  private static INVALID_PENALTY = 10000;

  public static pickSpot(request: PlacementRequest): PlacementResponse {
    const { container, yardMap } = request;
    
    if (!container || !yardMap) {
      return { error: "Invalid request: missing container or yard map" };
    }

    const scores: SlotScore[] = this.calculateScores(container, yardMap);
    
    // Find the slot with the minimum score
    const bestScore = scores.reduce((min, current) => 
      current.totalScore < min.totalScore ? current : min, 
      { totalScore: Number.MAX_SAFE_INTEGER } as SlotScore
    );

    // If the best score is still invalid, return error
    if (bestScore.totalScore >= this.INVALID_PENALTY) {
      return { error: "no suitable slot" };
    }

    return {
      containerId: container.id,
      targetX: bestScore.slot.x,
      targetY: bestScore.slot.y
    };
  }

  public static calculateScores(container: Container, yardMap: YardSlot[]): SlotScore[] {
    return yardMap.map(slot => {
      // Calculate Manhattan distance
      const distance = Math.abs(container.x - slot.x) + Math.abs(container.y - slot.y);
      
      // Size penalty
      const sizePenalty = (container.size === 'big' && slot.sizeCap === 'small') 
        ? this.INVALID_PENALTY 
        : 0;
      
      // Cold storage penalty
      const coldPenalty = (container.needsCold && !slot.hasColdUnit) 
        ? this.INVALID_PENALTY 
        : 0;
      
      // Occupied penalty
      const occupiedPenalty = slot.occupied 
        ? this.INVALID_PENALTY 
        : 0;
      
      // Total score
      const totalScore = distance + sizePenalty + coldPenalty + occupiedPenalty;
      
      return {
        slot,
        distance,
        sizePenalty,
        coldPenalty,
        occupiedPenalty,
        totalScore
      };
    });
  }
}