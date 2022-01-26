import Lottie, { AnimationItem } from 'lottie-web';

export default class MovingModel {
  motion: AnimationItem | null = null;
  timer: TimerHandler | null = null;
  speed = 2;

  constructor() {
    const box = document.querySelector('#dog');
    if (!box) return;

    this.motion = Lottie.loadAnimation({
      container: box,
      path: './json/dog.json',
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });

    this.motion.setSpeed(this.speed);
    // this.motion.play();
  }
}
