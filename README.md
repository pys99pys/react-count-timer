# react-count-timer

count animation react component with transition

### Demo

click [here](https://pys99pys.github.io/demo-pages/?page=react-count-timer)

### Usage

##### add package

```
$ yarn add react-counter-timer
```

##### use

```
import ReactCountTimer from 'react-count-timer

<div>
  <ReactCountTimer
    className="my-class-name"
    count={500}
    duration={3000}
  />
</div>
```

### Options

| option name | type   | required | description             |
| ----------- | ------ | -------- | ----------------------- |
| className   | string | false    | class name to add       |
| count       | number | true     | final number to render  |
| duration    | number | true     | time to reach the count |
