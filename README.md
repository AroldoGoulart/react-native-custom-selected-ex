# react-native-custom-selected-ex

Simple react-native selected for year and category

## Installation

```sh
npm install react-native-custom-selected-ex
```

## Usage

```js
import { Selector } from "react-native-custom-selected-ex";

// ...

 <Selector
        selectedValue={yearSelected}
        minYear={1900}
        maxYear={2020}
        mode="dialog"
        onChange={(year) => setYearSelected(year)}
        stylePicker={{}}
        // style from the main view, but the father of it
        styleView={{}}
        // If you want a custom component aside of the picker, you can pass it as a prop
        // iconChildren={<Icon name="calendar" size={20} color="black" />}
        // IF you want a custom array, you can pass it as a prop, this will overwrite the min and max year array
        //fullArray={[10, `1231`, 12]}
        // If you want hide de native icon of the picker, you can pass it as a prop
        transparentPickIcon={false}
      />

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
