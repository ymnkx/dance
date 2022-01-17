// import './style.css'

// const app = document.querySelector<HTMLDivElement>('#app')!

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

import PageMenu from './PageMenu';

import MovingModel from './MovingModel';
import MoonWalk from './MoonWalk';

(() => {
  new PageMenu('.common-section');

  const cntnrs: Array<HTMLElement> = Array.from(
    document.querySelectorAll('.js-moving-man')
  );
  if (!cntnrs) return;

  cntnrs.forEach((cntnr) => {
    if (cntnr.dataset.type === 'moonwalk') {
      new MoonWalk(cntnr);
    } else {
      new MovingModel(cntnr);
    }
  });
})();
