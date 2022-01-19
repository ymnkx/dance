import Lottie, { AnimationItem } from 'lottie-web';

export default class BreakDance {
  motion: AnimationItem | null = null;
  timer: number | null = null;
  box: HTMLElement | null = null;
  is_tapping = true;
  speed_default = 1;
  speed_max = 3;
  speed = 1;
  aditional_class = '-red';

  constructor(tgt: HTMLElement) {
    const json_name = tgt.dataset.json;
    if (!json_name) return;

    this.box = tgt.querySelector('.js-moving-box');
    if (!this.box) return;

    this.motion = Lottie.loadAnimation({
      container: this.box,
      path: './json/' + json_name,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });
    this.motion.setSpeed(this.speed_default);

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

  private clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private move() {
    if (!this.box) return;

    if (this.is_tapping) {
      if (this.speed <= this.speed_max) {
        this.speed += 0.01;
      }
    } else {
      this.speed -= 0.025;
    }

    if (this.speed <= this.speed_default) {
      this.speed = this.speed_default;
      this.clearTimer();
    } else {
      this.motion?.setSpeed(this.speed);
    }
  }

  private play() {
    this.motion?.setSpeed(1);
    this.is_tapping = true;
    this.box?.classList.add(this.aditional_class);
    this.clearTimer();
    this.timer = setInterval(() => {
      this.move();
    }, 15);
  }

  private stop() {
    this.is_tapping = false;
    this.box?.classList.remove(this.aditional_class);
  }
}
