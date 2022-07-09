import React from 'react'
import cooler from './air-cooler-500x500.jpg'
import mobile from './mobile.jpg'
import quantum from './quantum.jpeg'
const Cards = () => {
   // src: {};
  return (
 <div>
   <p className='freshr'><b>Fresh Recommendations</b></p>
  <div className="bg-light py-5 service-5">
<div className="container">
{/* <!-- Row --> */}
<div className="row">
{/* <!-- Column --> */}
<div className="col-md-4 wrap-service5-box">
<div className="card card-shadow border-0 mb-4">
<div className="card-body d-flex">
<div className="mr-4 mb-2 text-success-gradiant icon-size"><img className= 'card-image' src={cooler} alt="cooler"/></div>
<div className="">
<h6 className="font-weight-medium"><a href="#cooler" className="linking"><b>Cooler</b></a></h6>
<p className="mt-3">
    Owner:  <br/>
    Contact Deatils: <br/> Price:
</p>
</div>
</div>
</div>
</div>
{/* <!-- Column -->
<!-- Column --> */}
<div className="col-md-4 wrap-service5-box">
<div className="card card-shadow border-0 mb-4">
<div className="card-body d-flex">
<div className="mr-4 mb-2 text-success-gradiant icon-size"><img className= 'card-image' src={quantum} alt="quantum"/></div>
<div className="">
<h6 className="font-weight-medium"><a href="#quantum" className="linking"><b>Quantum</b></a></h6>
<p className="mt-3">Owner:  <br/>
    Contact Deatils:<br/> Price: </p>
</div>
</div>
</div>
</div>
{/* <!-- Column -->
<!-- Column --> */}
<div className="col-md-4 wrap-service5-box">
<div className="card card-shadow border-0 mb-4">
<div className="card-body d-flex">
<div className="mr-4 mb-2 text-success-gradiant icon-size"><img className= 'card-image' src={mobile} alt="mobile"/></div>
<div className="">
<h6 className="font-weight-medium"><a href="#mobile" className="linking"><b>Mobile</b></a></h6>
<p className="mt-3">Owner:  <br/>
    Contact Deatils:<br/> Price:</p>
</div>
</div>
</div>
</div>
{/* <!-- Column -->
<!-- Column --> */}
<div className="col-md-4 wrap-service5-box">
<div className="card card-shadow border-0 mb-4">
<div className="card-body d-flex">
<div className="mr-4 mb-2 text-success-gradiant icon-size">T</div>
<div className="">
<h6 className="font-weight-medium"><a href="#loab-coat" className="linking"><b>Lab Coat</b></a></h6>
<p className="mt-3">Owner:  <br/>
    Contact Deatils:<br/> Price:</p>
</div>
</div>
</div>
</div>
{/* <!-- Column -->
<!-- Column --> */}
<div className="col-md-4 wrap-service5-box">
<div className="card card-shadow border-0 mb-4">
<div className="card-body d-flex">
<div className="mr-4 mb-2 text-success-gradiant icon-size">L</div>
<div className="">
<h6 className="font-weight-medium"><a href="#lan" className="linking"><b>Lan Cable</b></a></h6>
<p className="mt-3">Owner:  <br/>
    Contact Deatils:<br/> Price:</p>
</div>
</div>
</div>
</div>
{/* <!-- Column -->
<!-- Column --> */}
<div className="col-md-4 wrap-service5-box">
<div className="card card-shadow border-0 mb-4">
<div className="card-body d-flex">
<div className="mr-4 mb-2 text-success-gradiant icon-size">F</div>
<div className="">
<h6 className="font-weight-medium"><a href="#books" className="linking"><b>Books</b></a></h6>
<p className="mt-3">Owner:  <br/>
    Contact Deatils:<br/> Price:</p>
</div>
</div>
</div>
</div>
<div className="col-md-12 mt-3 text-center">
<a href="#viewmore" className="btn btn-success-gradiant btn-md border-0 text-white"><span>View More</span></a>
</div>
</div>
</div>
</div>
</div>

  )
}

export default Cards