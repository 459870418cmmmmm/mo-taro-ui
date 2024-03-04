import React, {useState} from 'react';

const MIN_DISTANCE = 10;

type Direction = '' | 'vertical' | 'horizontal';

function getDirection(x: number, y: number) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }
  return '';
}

export function useTouch() {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [direction, setDirection] = useState<Direction>('');

  const isVertical = () => direction === 'vertical';
  const isHorizontal = () => direction === 'horizontal';

  const reset = () => {
    setDeltaX(0);
    setDeltaY(0);
    setOffsetX(0);
    setOffsetY(0);
    setDirection('');
  };

  const start = (event: React.TouchEvent<HTMLElement>) => {
    reset();
    setStartX(event.touches[0].clientX);
    setStartY(event.touches[0].clientY);
  };

  const move = (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    const dX = touch.clientX - startX;
    const dY = touch.clientY - startY;
    setDeltaX(dX);
    setDeltaY(dY);
    setMoveX(touch.clientX);
    setMoveY(touch.clientY);
    setOffsetX(Math.abs(dX));
    setOffsetY(Math.abs(dY));
    if (!direction) {
      setDirection(getDirection(offsetX, offsetY));
    }
  };

  return {
    move,
    start,
    reset,
    startX,
    startY,
    moveX,
    moveY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
  };
}
