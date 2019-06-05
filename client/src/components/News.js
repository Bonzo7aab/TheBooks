import React from 'react'
import { Editor } from '@tinymce/tinymce-react';

class News extends React.Component {
  handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
  }

  render() {
    return (
      <div>
        <div hidden>
          <Editor
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
            onChange={this.handleEditorChange}
          />
        </div>
        <h2>Hi There, Now we also have Spanish books. Feel free to check: Spanish</h2>
        <p>Also from 23th of June to 14th of July I have an oportunity to participate in amazing adventure and make one of my dreams come true. Therefore the store will be partially(or possibly fully) closed during this time. I really apologize for the inconvenience caused and I really want to thank you for your understading </p>
      </div>
    )
  }
}

export default News
