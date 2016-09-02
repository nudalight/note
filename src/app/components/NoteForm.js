import React from 'react';

import Editor from './Editor';
import ColorPalette from './ColorPalette';
import Tags from './Tags';

class NoteForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    let noteId = this.props.note.id || new Date().getTime();

    let {
      title,
      color
    } = this.refs;
    let text = tinymce.activeEditor.getContent();
    let tags = this.refs.tags.getTags();
    let bgColor = color.refs.col.value;

    let note = {
      id: noteId,
      title: title.value,
      text: text,
      bgColor: bgColor,
      tags: tags || ''
    };

    this.props.onSubmit(note);
    title.value = '';
    color.value = '';
  };


  render() {
    let { note } = this.props;
    return (
      <div className='container container-flex'>
        <div className='form-container'>
          <div className='form-row'>
            <label className='input-label'>Title</label>
            <input
              ref='title'
              className={this.props.form.error ? 'input-title error' : 'input-title'}
              autoFocus
              type='text'
              id='input-title'
              onChange={this.props.onChange}
              defaultValue={note.title || ''} />

            <label className='input-label'>Note</label>
            <Editor
              onChange={this.props.onChange}
              defaultText={note.text} />
          </div>

          <div className='form-row-edit'>
            <ColorPalette
                ref='color'
                defaultColor={note.bgColor} />

            <Tags
              ref='tags'
              tags={this.props.tags}
              onTagSearch={this.props.onTagSearch}
              onTagChecked={this.props.onTagChecked} />
          </div>
          <button
            onClick={this.onSubmit}
            className='btn-submit'>Save</button>
        </div>
      </div>
    )
  }
}

export default NoteForm;
