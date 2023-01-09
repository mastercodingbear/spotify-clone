import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import styles from "./.module.sass";

export default function RangeInput({
  onChange,
  maxValue,
  value,
  onCompleteChange,
  step,
}) {
  return (
    <div className={styles.range_input_wrapper}>
      <InputRange
        step={step}
        minValue={0}
        maxValue={maxValue || 1}
        value={value || 0.5}
        onChange={(value) => {
          onChange(value);
        }}
        formatLabel={() => {}}
        onChangeComplete={(value) => {
          onCompleteChange(value);
        }}
      />
    </div>
  );
}
