import React, { Component } from 'react'
import { ClipLoader } from 'react-spinners'

export default class Loader extends Component {
  render() {
    return (
      <div className='loader d-flex justify-content-center pt-5 mt-5'>
        <ClipLoader color="blue" size={30} />
      </div>
    )
  }
}
