import * as React from "react";

interface IProps {
  className?: string;
  count: number;
  duration: number;
}

const DELAY = 5;
const { createRef } = React;

class CounterComponent extends React.Component<IProps> {
  $el: React.RefObject<HTMLSpanElement>;
  timer: number;
  demicalLength: number;

  constructor(props: IProps) {
    super(props);

    this.$el = createRef();
    this.timer = 0;
    this.demicalLength = 0;
  }

  componentDidMount() {
    this.computeCount();
  }

  componentDidUpdate() {
    this.computeCount();
  }

  shouldComponentUpdate(prevProps: IProps) {
    return JSON.stringify(prevProps) !== JSON.stringify(this.props);
  }

  private computeCount() {
    const { count, duration } = this.props;

    const numbers: number[] = [];
    const from = Number(this.$el.current?.innerText || 0);
    const numberCount = count - from;
    const sceneCount = duration / DELAY;
    const demicalLength = Number((count.toString().split(".")[1] || "").length);

    for (let i = 0; i < sceneCount; i += 1) {
      numbers.push(
        Number(
          (from + (numberCount / (sceneCount - 1)) * i).toFixed(demicalLength)
        )
      );
    }

    this.operateCount(numbers.reverse());
  }

  private operateCount(numbers: number[]) {
    const n = [...numbers];

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!n.length) return;

      this.renderCount(n.pop() as number);
      this.operateCount(n);
    }, DELAY);
  }

  private renderCount(number: number) {
    if (!this.$el.current?.innerText) return;
    this.$el.current.innerText = number.toString();
  }

  render() {
    const { className } = this.props;

    return (
      <span ref={this.$el} className={className || ""}>
        0
      </span>
    );
  }
}

export default CounterComponent;
