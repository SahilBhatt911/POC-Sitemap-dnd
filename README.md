## Problem Statement

In a custom node-based canvas using `react-beautiful-dnd` for drag-and-drop functionality, there was an issue where fields inside a node shifted incorrectly when dragging and dropping. This was caused by the constraints of the canvas and the way `react-beautiful-dnd` renders dragged items. When a field is being dragged inside the node, its position calculation gets affected by the canvas’ scrolling, zooming, and positioning.

Moreover, when a drag occurs within a container that has been transformed or scrolled, `react-beautiful-dnd` sometimes causes the dragged element to "escape" the boundaries of its parent container. This results in rendering issues and incorrect behavior in terms of positioning, especially if the parent element (in this case, a node) is being dragged or transformed.

## Solution

To fix this issue, we implemented a **Portal** to ensure that the dragged item can be rendered correctly without being affected by the transformations of the canvas or its parent elements. By using React Portals, we can render the dragged item at the root level (in `document.body`), allowing it to be independent of any parent container’s positioning or transformations.

The solution involved creating a `PortalAwareItem` component that dynamically determines whether an item should be rendered inside a portal or within its parent container. When the item is being dragged, it is rendered in a portal to bypass any layout issues caused by transformations.

### Steps to Solution

1. **Create `PortalAwareItem` Component**:
   We built a `PortalAwareItem` component that detects if an item is being dragged (when its position changes to `fixed`). If it is being dragged, the component renders the item in a portal to avoid the parent container's transformations. If not, it renders the item in its usual position within the DOM.

2. **Render the Dragged Item in a Portal**:
   When a drag occurs, `react-beautiful-dnd` changes the `position` of the dragged item to `fixed`. The `PortalAwareItem` detects this and conditionally moves the item into a portal, allowing it to be rendered at the root level of the DOM (`document.body`), unaffected by transformations of its parent container (such as the node in the canvas).

3. **Use `PortalAwareItem` Inside `Draggable` Component**:
   We wrapped the content of the `Draggable` component inside the `PortalAwareItem`. This allows the item to be rendered properly during the drag operation while preserving its usual behavior when not being dragged.

### Code Explanation

#### 1. PortalAwareItem Component

The `PortalAwareItem` component checks whether the item is currently being dragged by checking if its `draggableProps.style.position` is set to `fixed`. If the item is being dragged, it renders it in a portal using `ReactDOM.createPortal`. Otherwise, it renders it normally in the DOM.

```jsx
import { createPortal } from 'react-dom';

const PortalAwareItem = ({ children, provided }: any) => {
  // Check if the item is currently being dragged
  const isDragging = provided.draggableProps.style?.position === 'fixed';

  // If not dragging, render the item normally
  if (!isDragging) {
    return children;
  }

  // If dragging, render the item in a portal to avoid parent transformations
  return createPortal(children, document.body);
};
```

#### 2. Using PortalAwareItem Inside Draggable

We wrapped the draggable field inside the `PortalAwareItem`. This ensures that the field is rendered in the correct context when being dragged (in a portal) and in its normal position otherwise.

```jsx
<PortalAwareItem provided={provided}>
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className="flex flex-row gap-[4px] border border-[#cbcbcb99] hover:border-[#DC79FF] border-solid rounded-[4px] bg-white p-2 mt-[7px] h-[60px] w-[200px]"
  >
    <div className="flex justify-center items-center w-[24px]">
      <GripVertical className="w-22 h-22 text-[#AEAEAE]" />
    </div>
    <div className="flex flex-col">
      <input
        style={handleStyle}
        type="text"
        defaultValue={field.name}
        onChange={onChange}
        placeholder="Name"
        className="text-[#091e42] font-inter font-medium text-base w-[150px]"
      />
      <input
        style={handleStyle}
        type="text"
        defaultValue={field.description}
        onChange={onChange}
        placeholder="Description"
        className="text-[#5e6c84] font-inter text-base font-normal leading-[150%] w-[150px]"
      />
    </div>
  </div>
</PortalAwareItem>
```

By wrapping the content of the `Draggable` component in `PortalAwareItem`, we ensure that the drag-and-drop behavior works as expected, regardless of any transformations or scrolling applied to the parent canvas or node.

---

## Explanation of the Need for Portals

The need for rendering an item in a portal arises because of how `react-beautiful-dnd` handles drag events. When a user starts dragging an item, its `position` is set to `fixed` to ensure that it remains visible during the drag operation, independent of its container's position or layout. However, when a parent container is transformed (e.g., translated or zoomed), the dragged item can be affected by these transformations, leading to incorrect positioning or rendering glitches.

By rendering the dragged item in a portal (i.e., at the top level of the DOM), we remove it from its parent container’s coordinate system. This ensures that the dragged item is displayed correctly, unaffected by any transformations applied to its parent container.

## Summary

### Problem:
When dragging fields inside a node on a canvas, the dragged items were being incorrectly positioned due to canvas transformations and scroll effects.

### Solution:
We created a `PortalAwareItem` component to detect when an item is being dragged and render it in a portal. This bypasses any transformation effects applied to the node or canvas, ensuring the item’s position is calculated independently and correctly during the drag operation.

---

### Benefits of the Solution

- **Correct Positioning**: The dragged item is no longer affected by the transformations or scrolling of its parent container.
- **Seamless Drag-and-Drop**: The drag-and-drop behavior works smoothly, with no visible shifts or glitches, providing a better user experience.
- **Reusable Logic**: The `PortalAwareItem` component is a reusable solution for any situation where a dragged item’s position might be affected by parent transformations.

By using this solution, the dragging and dropping functionality in a node-based canvas works as expected, even when the canvas or nodes are being moved or transformed.