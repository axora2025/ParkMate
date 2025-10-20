// src/core/models/RoleOption.ts
import type { ImageSourcePropType } from 'react-native';
import { RoleStrategy } from '../strategies/RoleStrategy';

export default class RoleOption {
  constructor(
    public id: 'driver' | 'owner',
    public title: string,
    public subtitle: string,
    public icon: ImageSourcePropType,
    public onPress: () => void
  ) {}

  static fromStrategy(s: RoleStrategy) {
    return new RoleOption(s.id, s.getTitle(), s.getSubtitle(), s.getIcon(), () => s.onPress());
  }
}
