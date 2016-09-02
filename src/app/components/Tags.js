import React from 'react';

import { difference } from 'lodash';

class Tags extends React.Component {
  getTags = () => {
    let rawTags = document.querySelectorAll('input[type="checkbox"]:checked');
    let tagsArray = [];
    for (var i = rawTags.length; i--; tagsArray.unshift(rawTags[i]));
    let tags = tagsArray.map((tag) => tag.value);
    return tags;
  };

  render() {
    if(this.props.isEditNote) {
      let noteTags = this.props.note.tags.map(tag => tag.value);
      let allTags = this.props.tags.map(tag => tag.value);
      let b = difference(allTags, noteTags);
      console.log(noteTags, allTags);
      console.log(b);

      var validList = allTags.filter(tag => {
        for(let i = 0; i < noteTags.length; i++) {
          console.log(tag, noteTags[i]);
          return tag == noteTags[i];
        }
      });
      console.log(validList, noteTags);
    }

    let tagsToRender = this.props.tags.map((tag, i) => {
      return (
        <li key={tag.value + i}>
          <input
            id={`tag-${tag.value}`}
            className='tag-checkbox'
            type='checkbox'
            defaultValue={tag.value}
            checked={tag.checked}
            onClick={this.props.onTagChecked}
          />
          <label className='tag' htmlFor={`tag-${tag.value}`}>{tag.value}</label>
        </li>
      )
    });

    return (
      <div>
        <input
          ref='tagInput'
          type='text'
          className='tag-input'
          placeholder='Press Enter to add tag'
          onKeyUp={this.props.onTagSearch}></input>
        <ul style={{height: '100px', overflowY: 'scroll'}} className='tag-list'>
         {tagsToRender}
        </ul>
        <div></div>
      </div>
    )
  }
}

export default Tags;
