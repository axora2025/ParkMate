import Slide from '../models/Slide';

/**
 * Simple, framework-agnostic controller for onboarding flows.
 * React keeps the index in state; this class returns the next index to use.
 */
export default class OnboardingController {
  private readonly _slides: Slide[];

  constructor(slides: Slide[]) {
    if (!slides || slides.length === 0) {
      throw new Error('OnboardingController requires at least one Slide.');
    }
    this._slides = slides;
  }

  /** All slides (read-only) */
  get slides(): Slide[] {
    return this._slides;
  }

  /** Number of slides */
  get total(): number {
    return this._slides.length;
  }

  /** Clamp index to valid range [0, total-1] */
  clamp(index: number): number {
    if (Number.isNaN(index)) return 0;
    return Math.max(0, Math.min(index, this.total - 1));
  }

  /** Move to next slide (or stay on last) */
  next(index: number): number {
    return this.clamp(index + 1);
  }

  /** Move to previous slide (or stay on first) */
  prev(index: number): number {
    return this.clamp(index - 1);
  }

  /** Jump to any slide by index (clamped) */
  goTo(index: number): number {
    return this.clamp(index);
  }

  /** Skip to the last slide */
  skip(): number {
    return this.total - 1;
  }

  /** Is first slide? */
  isFirst(index: number): boolean {
    return this.clamp(index) === 0;
  }

  /** Is last slide? */
  isLast(index: number): boolean {
    return this.clamp(index) === this.total - 1;
  }

  /** Get the current slide object (safe) */
  current(index: number): Slide {
    return this._slides[this.clamp(index)];
  }
}
