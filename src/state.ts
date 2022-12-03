import { default as Action } from "./action";
import { default as Condition } from "./condition";
import { default as IState } from "./interfaces";
import { default as Transition } from "./transition";
import { Some, None } from "@sniptt/monads";

class State<K extends string, T> {
  state: IState<T>;
  transitions: Array<Transition<K, T>>;

  public constructor({ state }: { state: IState<T> }) {
    this.state = state;
    this.transitions = [];
  }

  public transition({
    to,
    condition,
    actions,
  }: {
    to: K;
    condition: Condition<T>;
    actions: Array<Action<T>>;
  }) {
    this.transitions.push(
      new Transition({
        to,
        condition,
        actions,
      })
    );
    return this;
  }

  public decide({ context }: { context: T }) {
    for (const transition of this.transitions) {
      if (transition.condition(context)) {
        return Some(transition);
      }
    }
    return None;
  }
}

export default State;
