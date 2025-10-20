import RoleOption from '../models/RoleOption';
import DriverStrategy from '../strategies/DriverStrategy';
import OwnerStrategy from '../strategies/OwnerStrategy';

export default class HomeController {
  getWelcomeTitle() { return 'Welcome To'; }
  getBrand() { return 'ParkMate'; }
  getSubtitle() { return "Choose how you'd like to use the app"; }

  // Compose strategies → view options
  getOptions(): RoleOption[] {
    const strategies = [new DriverStrategy(), new OwnerStrategy()];
    return strategies.map(RoleOption.fromStrategy);
  }
}
