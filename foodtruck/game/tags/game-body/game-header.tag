game-header
  .cash(if="{ cash }") ${ cash }
  .cash(if="{ !cash }") ---

  script.
    this.on('update', () => {
      const state = this.opts.store.state;
      if (!state.active_career) {
        this.cash = null;
        return;
      }

      this.cash = state.active_career.cash.toFixed(2);
    });