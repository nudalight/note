import React from 'react';

import ReactHtmlParser from 'react-html-parser';

class NoteList extends React.Component {
  render() {
    let { notes } = this.props;
    let notesToRender = Object.keys(notes).map(note => {
      return (
        <li key={notes[note].id}
          className={notes[note].bgColor}>
          <h2 className="note-title">
            {notes[note].title}
          </h2>
          {ReactHtmlParser(notes[note].text)}
          <ul className="note-tags">
            {notes[note].tags.map((tag, i) =>
              <li className="note-tags-item" key={i}>{tag}</li>)}
          </ul>
          <button className="btn-edit" onClick={this.props.onEditNote.bind(null, notes[note])}>
            Edit
          </button>
          <button className="btn-remove" onClick={this.props.onRemoveNote.bind(null, notes[note].id)}>
            x
          </button>
        </li>
      )
    });

    return (
      <div className="container">
        <ul className="note-list">
          {notesToRender}
        </ul>
      </div>
    )
  }
}

export default NoteList;
