import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface ISelectorProps {
  minYear: number;
  maxYear: number;
  onChange: (year: number) => void;
  selectedValue: number;
  stylePicker?: ViewStyle;
  styleView?: ViewStyle;
  placeholder?: string;
  mode?: 'dropdown' | 'dialog';
  fullArray?: any[];
  transparentPickIcon?: boolean;
  iconChildren?: () => ReactNode;
}

interface ICustomSelectorProps {
  onChange: (value: { value: string; id: number }) => void;
  selectedValue: number;
  stylePicker?: ViewStyle;
  styleView?: ViewStyle;
  placeholder?: string;
  mode?: 'dropdown' | 'dialog';
  fullArray: {
    value: string;
    id: number;
  }[];
  transparentPickIcon?: boolean;
  iconChildren?: () => ReactNode;
}

export function Selector(props: ISelectorProps): ReactElement {
  const {
    mode = 'dropdown',
    minYear,
    maxYear,
    onChange,
    selectedValue,
    stylePicker = {},
    placeholder,
    fullArray,
    transparentPickIcon = false,
    iconChildren,
    styleView = {},
  } = props;

  const [arrayOption, setArrayOptions] = useState<number[] | string[]>([]);

  const generateBetweenYears = (minY: number, maxY: number) => {
    const years = [];
    for (let i = minY; i <= maxY; i++) {
      years.push(i);
    }
    return years;
  };

  useEffect(() => {
    if (fullArray && fullArray.length > 0) {
      setArrayOptions(fullArray);
      return;
    }
    //@ts-ignore
    setArrayOptions(generateBetweenYears(minYear, maxYear));
  }, [minYear, maxYear, fullArray]);

  return (
    //@ts-ignore
    <View style={{ flexDirection: `row`, ...styleView }}>
      {iconChildren ? iconChildren() : null}
      {
        //@ts-ignore
        <Picker
          selectedValue={selectedValue}
          onValueChange={(value, _) => {
            onChange(value);
          }}
          mode={mode}
          placeholder={placeholder || undefined}
          style={[
            styles.picker,
            stylePicker,
            transparentPickIcon ? styles.transparent : {},
          ]}
        >
          {arrayOption.map((year) => (
            //@ts-ignore
            <Picker.Item
              style={{
                color: `red`,
                backgroundColor: `red`,
              }}
              label={year.toString()}
              value={year}
              key={year}
            />
          ))}
        </Picker>
      }
    </View>
  );
}

export function CustomSelector(props: ICustomSelectorProps): ReactElement {
  const {
    mode = 'dropdown',
    onChange,
    selectedValue,
    stylePicker = {},
    placeholder,
    fullArray,
    transparentPickIcon = false,
    iconChildren,
    styleView = {},
  } = props;

  return (
    //@ts-ignore
    <View style={{ flexDirection: `row`, ...styleView }}>
      {iconChildren ? iconChildren() : null}
      {
        //@ts-ignore
        <Picker
          selectedValue={selectedValue}
          onValueChange={(value, _) => {
            onChange(value);
          }}
          mode={mode}
          placeholder={placeholder || undefined}
          style={[
            styles.picker,
            stylePicker,
            transparentPickIcon ? styles.transparent : {},
          ]}
        >
          {fullArray.map((values) => (
            //@ts-ignore
            <Picker.Item
              style={{
                color: `red`,
                backgroundColor: `red`,
              }}
              label={values.value}
              value={values.id}
              key={values.id + values.value}
            />
          ))}
        </Picker>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});
