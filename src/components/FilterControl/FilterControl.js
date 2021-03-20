import React from 'react';
import PropTypes from 'prop-types';
import style from './FilterControl.module.scss'
import Slider from '@material-ui/core/Slider';

function FilterControl({ title,onValueChange}) {
    const handleChange=(event, newValue)=>{
        onValueChange(newValue)
    }
    const marks = [
        {
          value: 0,
          label: '0',
        },
        {
          value: 100,
          label: '100',
        },
      ];
  return (
    <div className={style.container}>
        <span className={style.title}>{title}</span>
        <Slider
            defaultValue={0}
            step={1}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            marks={marks}
            onChange={handleChange}
            />
    </div>
  );
}
FilterControl.propTypes = {
  title: PropTypes.string,
  selectedValue:PropTypes.func
 
};
export default React.memo(FilterControl);
