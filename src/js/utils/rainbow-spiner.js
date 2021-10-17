import refs from '../refs.js';
const { spinerContainer } = refs;

export const spiner = {
  isHidden: spinerContainer.classList.contains('hidden'),
  show() {
    spinerContainer.classList.remove('hidden');
  },
  hide() {
    spinerContainer.classList.add('hidden');
  },
};
