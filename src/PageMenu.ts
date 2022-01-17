export default class PageMenu {
  constructor(sections_selector: string) {
    const sections = document.querySelectorAll(sections_selector);

    const options = {
      root: document.querySelector('.common-main'),
      rootMargin: '-50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry.target.id);

          this.selectItem(entry.target.id);
        }
      });
    }, options);

    sections.forEach((item) => {
      observer.observe(item);
    });
  }

  private selectItem(name: string): void {
    const current = document.querySelector('#js-pagemenu a.-active');
    if (current !== null) {
      current.classList.remove('-active');
    }
    const active = document.querySelector(`a[href='#${name}']`);
    active?.classList.add('-active');
  }
}
