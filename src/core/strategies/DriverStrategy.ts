// src/core/strategies/DriverStrategy.ts
import { router } from 'expo-router';
import type { ImageSourcePropType } from 'react-native';
import { RoleStrategy } from './RoleStrategy';

export default class DriverStrategy implements RoleStrategy {
  id: 'driver' = 'driver';
  getTitle() { return "I'm a Driver"; }
  getSubtitle() { return 'Find parking near you'; }
  getIcon(): ImageSourcePropType {
    return require('../../../assets/icons/driver.png'); 
  }
  onPress() { router.push('/driver'); }
}
