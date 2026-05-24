import { useRef, useEffect } from 'react';

export function useHorizontalScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let snapTimeout: ReturnType<typeof setTimeout>;

    // Wheel: disable snap, scroll, re-enable snap after idle
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.style.scrollSnapType = 'none';
      el.scrollLeft += e.deltaY * 1.2;
      clearTimeout(snapTimeout);
      snapTimeout = setTimeout(() => {
        el.style.scrollSnapType = '';
      }, 150);
    };

    // Drag: use clientX directly to avoid offsetLeft issues
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
      e.preventDefault(); // prevent text/image selection
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      el.style.scrollSnapType = 'none';
      el.scrollLeft = scrollLeft - (e.clientX - startX);
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      el.style.cursor = '';
      el.style.userSelect = '';
      snapTimeout = setTimeout(() => {
        el.style.scrollSnapType = '';
      }, 150);
    };

    // Prevent browser from dragging images/elements inside the gallery
    const onDragStart = (e: DragEvent) => e.preventDefault();

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('dragstart', onDragStart);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      clearTimeout(snapTimeout);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('dragstart', onDragStart);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return ref;
}
