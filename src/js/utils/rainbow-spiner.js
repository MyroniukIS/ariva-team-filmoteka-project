import refs from '../refs.js';
const { spinerContainer } = refs;

export const spiner = {
    show() {
         spinerContainer.classList.remove("hidden");
    },
    hide() {
        spinerContainer.classList.add("hidden");
    }
}
