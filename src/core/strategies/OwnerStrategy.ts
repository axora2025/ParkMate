// src/core/strategies/OwnerStrategy.ts
import { router } from 'expo-router';
import type { ImageSourcePropType } from 'react-native';
import { RoleStrategy } from './RoleStrategy';

export default class OwnerStrategy implements RoleStrategy {
  id: 'owner' = 'owner';
  getTitle() { return "I'm a parking owner"; }
  getSubtitle() { return 'List your parkings and earn'; }
  getIcon(): ImageSourcePropType {
    return require('../../../assets/icons/owner.png'); 
  }
  onPress() { router.push('/owner'); }
}
