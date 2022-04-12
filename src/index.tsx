import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ModalSelector, { ModalSelectorProps } from 'react-native-modal-selector';

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
  cancelText?: string;
  placeHolder?: string;
  pickerOptionsIos?: ModalSelectorProps;
  forceIOSModal?: boolean;
}

interface ICustomSelectorProps {
  onChange: (value: { value: string; id: number }) => void;
  selectedValue: { value: string; id: number };
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
  cancelText?: string;
  placeHolder?: string;
  pickerOptionsIos?: ModalSelectorProps;
  forceIOSModal?: boolean;
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
    cancelText = 'Cancel',
    placeHolder = 'Select a item',
    pickerOptionsIos,
    forceIOSModal = false,
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

  if (Platform.OS === 'ios' || forceIOSModal) {
    let data_picker = [];

    if (fullArray && fullArray.length > 0) {
      data_picker = fullArray.map((item) => {
        return {
          key: item,
          label: item,
        };
      });
    } else {
      data_picker = generateBetweenYears(minYear, maxYear).map((item) => {
        return {
          key: item,
          label: item,
        };
      });
    }

    return (
      //@ts-ignore
      <ModalSelector
        {...pickerOptionsIos}
        //@ts-ignore
        data={data_picker}
        cancelText={cancelText}
        initValue={placeHolder}
        onChange={onChange}
        style={[styles.pickerIos, stylePicker]}
      />
    );
  }

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
    pickerOptionsIos,
    placeHolder = 'Select a item',
    cancelText = 'Cancel',
    forceIOSModal = false,
  } = props;

  if (Platform.OS === 'ios' || forceIOSModal) {
    let data_picker = [] as unknown as { key: any; label: any }[];

    if (fullArray && fullArray.length > 0) {
      data_picker = fullArray.map((item) => {
        return {
          key: item.id,
          label: item.value,
        };
      });
    }

    return (
      //@ts-ignore
      <ModalSelector
        {...pickerOptionsIos}
        //@ts-ignore
        data={data_picker}
        cancelText={cancelText}
        initValue={placeHolder}
        onChange={onChange}
        style={[styles.pickerIos, stylePicker]}
      />
    );
  }

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
  pickerIos: {
    width: '100%',
  },
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
