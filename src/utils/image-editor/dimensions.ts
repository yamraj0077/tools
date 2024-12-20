import { ImageDimensions, AspectRatioPreset } from '../../types/image-editor';

export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

export function maintainAspectRatio(
  currentDimensions: ImageDimensions,
  newValue: number,
  dimension: 'width' | 'height'
): ImageDimensions {
  const ratio = calculateAspectRatio(currentDimensions.width, currentDimensions.height);
  
  if (dimension === 'width') {
    return {
      width: newValue,
      height: Math.round(newValue / ratio)
    };
  } else {
    return {
      width: Math.round(newValue * ratio),
      height: newValue
    };
  }
}

export function getDimensionsForRatio(
  currentDimensions: ImageDimensions,
  ratio: AspectRatioPreset
): ImageDimensions {
  if (ratio === 'custom') {
    return currentDimensions;
  }

  const [widthRatio, heightRatio] = ratio.split(':').map(Number);
  const targetRatio = widthRatio / heightRatio;
  const currentRatio = calculateAspectRatio(currentDimensions.width, currentDimensions.height);

  if (targetRatio > currentRatio) {
    // Width is the constraint
    return {
      width: currentDimensions.width,
      height: Math.round(currentDimensions.width * (heightRatio / widthRatio))
    };
  } else {
    // Height is the constraint
    return {
      width: Math.round(currentDimensions.height * (widthRatio / heightRatio)),
      height: currentDimensions.height
    };
  }
}

export function validateDimensions(dimensions: ImageDimensions): ImageDimensions {
  return {
    width: Math.max(1, Math.min(dimensions.width, 8000)),
    height: Math.max(1, Math.min(dimensions.height, 8000))
  };
}