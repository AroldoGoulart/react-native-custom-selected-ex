import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomSelector, Selector } from 'react-native-custom-selected-ex';

export default function App() {
  const [yearSelected, setYearSelected] = useState<number>(2020);

  return (
    <>
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
    </>
  );
}
