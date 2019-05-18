import React, { Component } from 'react';

export default class Example extends Component {
  render() {
    return (
      <iframe title='fb'
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fthebookspl%2F&tabs=timeline&width=300&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1865182003779741"
        width="100%" height="300"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    );
  }
}