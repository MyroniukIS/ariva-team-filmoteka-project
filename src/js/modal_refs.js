export default function (modal) {
    function onOpenModal() {
        modal.classList.add('is-open');
        window.addEventListener('keydown', onEscKeyPress);
      }
      
      function onCloseModalClick(e) {
        modal.classList.remove('is-open');
      }
      
      function onEscKeyPress(e) {
        if (e.code === 'Escape') {
          onCloseModalClick();
        }
      }
      
      return {
          
        onOpenModal,
      
        onCloseModalClick,
      
      }
}



  