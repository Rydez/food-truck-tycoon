game-header
  .cash(if="{ cash }") ${ cash }
  .cash(if="{ !cash }") ---

  script.
    this.on('update', () => {
      const state = this.opts.store.state;
      const active_career_id = state.active_career_id;
      if (!active_career_id) {
        this.cash = null;
        return;
      }

      const active_career = state.careers.find(c => c.id === active_career_id);
      this.cash = active_career.cash.toFixed(2);
    });