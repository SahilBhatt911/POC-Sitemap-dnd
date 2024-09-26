import { createPortal } from 'react-dom';

const PortalAwareItem = ({ children, provided }: any) => {
  const isDragging = provided.draggableProps.style?.position === 'fixed';

  if (!isDragging) {
    return children;
  }

  return createPortal(children, document.body);
};

export default PortalAwareItem;
