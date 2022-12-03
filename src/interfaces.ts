interface IState<T> {
  entry(context: T): void;
  exit(context: T): void;
  update(context: T): void;
}

export default IState;
