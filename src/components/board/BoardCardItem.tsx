import { useDrag, useDrop } from "react-dnd";
import type { BoardCard } from "../../types/api";
import { CARD_DND_TYPE } from "./dnd";
import type { DraggedCard } from "./dnd";

interface BoardCardItemProps {
  card: BoardCard;
  columnId: string;
  index: number;
  onMove: (
    item: DraggedCard,
    targetColumnId: string,
    targetIndex: number
  ) => void;
  onSelect?: (card: BoardCard) => void;
}

export const BoardCardItem = ({
  card,
  columnId,
  index,
  onMove,
  onSelect
}: BoardCardItemProps) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: CARD_DND_TYPE,
      item: { cardId: card.id, sourceColumnId: columnId, sourceIndex: index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [card.id, columnId, index]
  );

  const [{ isOver, canDrop }, dropRef] = useDrop<
    DraggedCard,
    void,
    { isOver: boolean; canDrop: boolean }
  >(
    () => ({
      accept: CARD_DND_TYPE,
      canDrop: (item) => item.cardId !== card.id,
      drop: (item, monitor) => {
        if (!monitor.didDrop()) {
          onMove(item, columnId, index);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop()
      })
    }),
    [card.id, columnId, index, onMove]
  );

  const setRefs = (node: HTMLElement | null) => {
    dragRef(dropRef(node));
  };

  const description = card.description?.trim();

  return (
    <article
      ref={setRefs}
      className="card-item"
      style={{
        opacity: isDragging ? 0.5 : 1,
        outline: isOver && canDrop ? "2px solid var(--accent)" : "none",
        outlineOffset: 2
      }}
      onClick={() => {
        if (!isDragging) {
          onSelect?.(card);
        }
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span className="badge">{card.type}</span>
        <span className="helper-text">{card.priority}</span>
      </div>
      <h4 style={{ margin: "0.35rem 0" }}>{card.title}</h4>
      {description ? <p className="card-description">{description}</p> : null}
      {card.assignee ? (
        <p className="helper-text" style={{ margin: 0 }}>
          Assignee: {card.assignee.displayName}
        </p>
      ) : (
        <p className="helper-text" style={{ margin: 0 }}>
          Unassigned
        </p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0.35rem"
        }}
      >
        <span className="helper-text">
          {card.comments.length} comment{card.comments.length === 1 ? "" : "s"}
        </span>
      </div>
    </article>
  );
};
