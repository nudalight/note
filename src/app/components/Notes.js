import React from 'react';
import ReactDOM from 'react-dom';

import NoteList from './NoteList';
import NoteForm from './NoteForm';
import Header from './Header';

import tags from '../shared/tags';

class Notes extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: {},
      note: {},
      tags: [],
      form: {}
    }
  }

  componentWillMount() {
    let localStorageRef = localStorage.getItem('cool-memorandum');
    if(localStorageRef) {
      this.setState({
        notes: JSON.parse(localStorageRef)
      });
    }
    this.setState({
      tags: tags
    })
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('cool-memorandum', JSON.stringify(nextState.notes));
  }

  onRemoveNote = (noteId) => {
    let editNote = this.state.note;
    let currentNotes = this.state.notes;
    if(editNote.id === currentNotes[noteId].id) {
      this.setState({
        note: {}
      })
    }
    delete currentNotes[noteId];
    this.setState({
      notes: currentNotes
    })
  };

  onCreateNote = (note) => {
    if (!note.title.length) {
      this.state.form.error = 'Please, set title of note';
      this.setState({
        note: this.state.note
      })
    } else {
      this.state.notes[note.id] = note;
      this.setState({
        notes: this.state.notes,
        form: {}
      });
      tinymce.activeEditor.setContent('');
      let newState = this.state.tags.map(tag => (
        {value: tag.value, checked: false}
      ));
      this.setState({
        tags: newState
      })
    }
  };

  onEditNote = (note) => {
    ReactDOM.render(
      <NoteForm
        note={note}
        onSubmit={this.editNote}
        form={this.state.form}
        isEditNote={true}
        tags={this.state.tags}
        onTagChecked={this.onTagChecked}
        onTagSearch={this.onTagSearch}
      />, document.querySelector('.edit-note'));
    tinymce.activeEditor.setContent(note.note);
  };

  editNote = (note) => {
    this.state.notes[note.id] = note;
    this.setState({
      notes: this.state.notes
    });
    ReactDOM.unmountComponentAtNode(document.querySelector('.edit-note'));
  };

  onTagSearch = (e) => {
    e.preventDefault();
    if(e.keyCode === 13 && e.target.value !== '') {
      let r = this.state.tags.map(tag => tag.value);
      let t = e.target.value;
      if(r.indexOf(t) === -1) {
        this.state.tags.unshift( {
          value: e.target.value.toLowerCase(),
          checked: true
        });
        this.setState({
          tags: this.state.tags
        });
        e.target.value = '';
      }
    }
  };

  onTagChecked = (e) => {
    let isChecked = e.target.checked;
    let checkedTag = e.target.value;
    let index;
    this.state.tags.map((tag, i) => {
      if (tag.value == checkedTag) {
        index = i;
      }
    });
    if(isChecked) {
      this.state.tags[index] = {value: checkedTag, checked: true};
      this.setState({
        tags: this.state.tags
      })
    }
    if(!isChecked) {
      this.state.tags[index] = {value: checkedTag, checked: false};
      this.setState({
        tags: this.state.tags
      })
    }
  };

  render() {
    return (
      <div>
        <Header title='Note Note'/>
        <NoteForm
          onChange={this.onChange}
          tags={this.state.tags}
          onTagSearch={this.onTagSearch}
          categories={this.state.categories}
          onSubmit={this.onCreateNote}
          form={this.state.form}
          onTagChecked={this.onTagChecked}
          note={this.state.note}
        />


        <NoteList
          notes={this.state.notes}
          onRemoveNote={this.onRemoveNote}
          onEditNote={this.onEditNote}
          onSubmit={this.onCreateNote}
        />
        <div className='edit-note'></div>
      </div>
    )
  }
}

export default Notes;
