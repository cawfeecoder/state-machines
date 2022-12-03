import { default as Action } from "./action";
import { default as State } from "./state";

class Machine<K extends string, T> {
  states: Map<K, State<K, T>> = new Map();
  activeState: K;

  public constructor(activeState: K) {
    this.activeState = activeState;
  }

  public state(id: K, state: State<K, T>) {
    this.states.set(id, state);
    return this;
  }

  public setActiveState(id: K, actions: Array<Action<T>>, context: T) {
    if (this.states.has(this.activeState)) {
      let state = this.states.get(this.activeState);
      state?.state.exit(context);
    }
    for (const action of actions) {
      action(context);
    }
    if (this.states.has(id)) {
      let state = this.states.get(id);
      state?.state.entry(context);
      this.activeState = id;
    }
  }

  public decide(context: T) {
    if (this.states.has(this.activeState)) {
      let state = this.states.get(this.activeState);
      let decision = state?.decide({ context });
      if (decision?.isSome) {
        this.setActiveState(
          decision.unwrap().to,
          decision.unwrap().actions,
          context
        );
      }
    }
  }

  public update(context: T) {
    if (this.states.has(this.activeState)) {
      let state = this.states.get(this.activeState);
      state?.state.update(context);
    }
  }
}

export default Machine;
