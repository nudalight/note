import React from 'react';

import colors from '../shared/color-palette';

class ColorPalette extends React.Component {
  render() {
    let colorsToRender = Object.keys(colors).map(colorName => {
      return (
        <option
          key={colorName}
          value={colorName}
          style={{background: colors[colorName]}}
        >{colorName}</option>
      )
    });
    return (
      <select
        ref="col"
        className="select-color"
        name="note-color"
        id="note-color"
        defaultValue={this.props.defaultColor}>
        <option value="">Choose color</option>
        {colorsToRender}
      </select>
    )
  }
}

export default ColorPalette;
