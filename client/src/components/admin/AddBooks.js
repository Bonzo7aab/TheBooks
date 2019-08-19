import React from 'react'
import axios from 'axios'
import CSVReader from 'react-csv-reader'

function AddBooks() {

  function handleForce(data){
    this.setState({selectedCSV: data})
  }

  function onHandleUpload(){
    let data = this.state.selectedCSV
    axios.post('http://localhost:4000/newBooks', data)
      .then(res => {
        console.log('Books added to MongoDB ', res.data)
      })
      .catch(error => {
        console.log('Error during books adding to MongoDB ', error)
      })
  }
  return (
    <div className='ui block header'>
      <CSVReader
        label="Select CSV "
        onFileLoaded={handleForce}
        inputStyle={{ color: 'red' }}
      />
      <button className='ui button grey' onClick={onHandleUpload}><i className="file icon"></i>Upload</button>
    </div>
  )
}

export default AddBooks
