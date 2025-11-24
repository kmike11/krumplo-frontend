export const CARD_DND_TYPE = "BOARD_CARD" as const;

export interface DraggedCard {
  cardId: string;
  sourceColumnId: string;
  sourceIndex: number;
}
