import { default as Action } from "./action";
import { default as Condition } from "./condition";

class Transition<K extends string, T> {
  public to: K;
  public condition: Condition<T>;
  public actions: Array<Action<T>>;

  public constructor({
    to,
    condition,
    actions,
  }: {
    to: K;
    condition: Condition<T>;
    actions: Array<Action<T>>;
  }) {
    this.to = to;
    this.condition = condition;
    this.actions = actions;
  }
}

export default Transition;
