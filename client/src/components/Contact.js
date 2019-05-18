import React, { Component } from 'react'
import { MapContainer } from './MapContainer';
import Example from './Facebook';

class Contact extends Component {
  render() {
    return (
      <div className='ui grid'>
        <div className='five wide column'><Example /></div>
        <div className='four wide column'>
          Monday - Saturday: 11:00 am-7:00 pm
          Thebooks.pl Paweł Woźniak
          Puławska 140, 02-624 Warszawa
          pawelwozniak@thebooks.pl
          +48 507 924 492
          Nip: 9512234390
        </div>
        <div className='seven wide column'>
          <MapContainer />
        </div>
      </div>
    )
  }
}

export default Contact