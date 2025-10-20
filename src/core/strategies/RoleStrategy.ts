// src/core/strategies/RoleStrategy.ts
import type { ImageSourcePropType } from 'react-native';

export interface RoleStrategy {
  id: 'driver' | 'owner';
  getTitle(): string;
  getSubtitle(): string;
  getIcon(): ImageSourcePropType; 
  onPress(): void;
}
