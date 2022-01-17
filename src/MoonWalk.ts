import Lottie, { AnimationItem } from 'lottie-web';

export default class MoonWalk {
  motion: AnimationItem | null = null;
  timer: number | null = null;
  box: HTMLElement | null = null;
  offset = 0;
  is_back = true;

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
      autoplay: false,
    });

    this.motion.setSpeed(1);

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

  private move() {
    if (!this.box) return;
    if (this.is_back) this.offset++;
    else this.offset--;
    if (this.offset <= 0) {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.motion?.stop();
      this.box?.classList.remove('-reverse');
    } else {
      this.box.style.left = -this.offset + 'px';
    }
  }

  private play() {
    console.log('play');
    this.motion?.setSpeed(1);
    this.motion?.play();
    this.is_back = true;
    this.box?.classList.remove('-reverse');
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.move();
    }, 15);
  }

  private stop() {
    console.log('stop');
    this.is_back = false;
    this.box?.classList.add('-reverse');
  }
}
