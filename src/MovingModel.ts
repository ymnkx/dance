import Lottie, { AnimationItem } from 'lottie-web';

export default class MovingModel {
  motion: AnimationItem | null = null;
  timer: TimerHandler | null = null;
  speed = 1.25;

  constructor(tgt: HTMLElement) {
    const json_name = tgt.dataset.json;

    if (!json_name) return;

    const box = tgt.querySelector('.js-moving-box');

    if (!box) return;
    this.motion = Lottie.loadAnimation({
      container: box,
      path: './json/' + json_name,
      renderer: 'svg',
      loop: true,
      autoplay: false,
    });

    this.motion.setSpeed(this.speed);
    this.motion.play();

    this.motion.addEventListener('DOMLoaded', () => {
      tgt.addEventListener('mousedown', () => {
        this.play();
      });
      tgt.addEventListener('mouseup', () => {
        this.stop();
      });
      tgt.addEventListener('touchstart', () => {
        this.play();
      });
      tgt.addEventListener('touchend', () => {
        this.stop();
      });
    });
  }

  private play() {
    this.motion?.setSpeed(0.2);
  }

  private stop() {
    this.motion?.setSpeed(this.speed);
  }
}
