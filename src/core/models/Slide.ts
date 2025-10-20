export default class Slide {
  constructor(
    public id: string,
    public title: string,
    public highlighted: string | null,
    public subtitle: string,
    public image: number
  ) {}
}
