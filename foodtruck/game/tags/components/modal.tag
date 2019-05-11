modal(show="{ visible }")
  div
    <yield/>

  script.
    this.visible = false;

    this.on('mount', () => {
      const confirm = this.root.querySelector('.confirm');
      if (confirm) {
        confirm.addEventListener('click', (ev) => {
          if (this.opts.onConfirm) {
            this.opts.onConfirm(ev, this.data);
          }

          this.hide();
          this.update();
          ev.stopPropagation();
          this.trigger('confirm');
        });
      }

      const cancel = this.root.querySelector('.cancel');
      if (cancel) {
        cancel.addEventListener('click', (ev) => {
          if (this.opts.onCancel) {
            this.opts.onCancel(ev);
          }

          this.hide();
          this.update();
          ev.stopPropagation();
          this.trigger('cancel');
        });
      }
    });

    this.show = (data) => {
      if (this.opts.onShow) {
        this.opts.onShow();
      }

      this.data = data;
      this.visible = true;
      this.update();

      const first_input = this.root.querySelector('input');
      if (first_input) {
        first_input.focus();
      }
    };

    this.hide = () => {
      this.visible = false;
    };