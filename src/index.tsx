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

  componentWillUnmount() {
    this.removeTimer();
  }

  shouldComponentUpdate(prevProps: IProps) {
    return JSON.stringify(prevProps) !== JSON.stringify(this.props);
  }

  private computeCount() {
    const { count, duration } = this.props;

    const numbers: number[] = [];
    const from = Number(
      this.$el.current?.textContent?.replace(/[^0-9]/g, "") || 0
    );
    const numberCount = count - from;
    const sceneCount = Math.max(DELAY, Math.min(duration, 999999) / DELAY);
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
    this.removeTimer();

    (function countAction(_this) {
      _this.timer = setTimeout(() => {
        if (!n.length) return;

        _this.renderCount(n.pop() as number);
        countAction(_this);
      }, DELAY);
    })(this);
  }

  private renderCount(number: number) {
    if (!this.$el.current?.textContent) return;

    const [integer, demical] = number.toString().split(".");

    this.$el.current.textContent = `${integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    )}${!!demical ? `.${demical}` : ""}`;
  }

  private removeTimer() {
    if (!this.timer) return;
    clearTimeout(this.timer);
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
