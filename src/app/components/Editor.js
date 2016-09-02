import React from 'react';

import TinyMCE from 'react-tinymce';

class Editor extends React.Component {
  componentDidMount() {
    if(this.props.defaultText) {
      tinymce.activeEditor.setContent(this.props.defaultText);
    }
  }

  render() {
    return (
      <TinyMCE
        id={this.props.iD}
        config={{
          content_css : '/styles.css',
          toolbar: 'undo redo | bold italic underline strikethrough | numlist',
          menubar: false,
          statusbar: false,
          plugins: "autoresize",
          autoresize_min_height: 50,
          autoresize_overflow_padding: 5
        }}
      />
    )
  }
}

export default Editor;
