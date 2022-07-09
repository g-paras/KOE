import React from 'react'
import cooler from './air-cooler-500x500.jpg'
import mobile from './mobile.jpg'
import quantum from './quantum.jpeg'
const Cards = () => {
   // src: {};
  return (
 <div>
   <p className='freshr'><b>Fresh Recommendations</b></p>
  <div class="bg-light py-5 service-5">
<div class="container">
{/* <!-- Row --> */}
<div class="row">
{/* <!-- Column --> */}
<div class="col-md-4 wrap-service5-box">
<div class="card card-shadow border-0 mb-4">
<div class="card-body d-flex">
<div class="mr-4 mb-2 text-success-gradiant icon-size"><img className= 'card-image' src={cooler} alt="cooler"/></div>
<div class="">
<h6 class="font-weight-medium"><a href="#cooler" class="linking"><b>Cooler</b></a></h6>
<p class="mt-3">
    Owner:  <br/>
    Contact Deatils: <br/> Price:
</p>
</div>
</div>
</div>
</div>
{/* <!-- Column -->
<!-- Column --> */}
<div class="col-md-4 wrap-service5-box">
<div class="card card-shadow border-0 mb-4">
<div class="card-body d-flex">
<div class="mr-4 mb-2 text-success-gradiant icon-size"><img className= 'card-image' src={quantum} alt="quantum"/></div>
<div class="">
<h6 class="font-weight-medium"><a href="#quantum" class="linking"><b>Quantum</b></a></h6>
<p class="mt-3">Owner:  <br/>
    Contact Deatils:<br/> Price: </p>
</div>
</div>
</div>
</div>
{/* <!-- Column -->
<!-- Column --> */}
<div class="col-md-4 wrap-service5-box">
<div class="card card-shadow border-0 mb-4">
<div class="card-body d-flex">
<div class="mr-4 mb-2 text-success-gradiant icon-size"><img className= 'card-image' src={mobile} alt="mobile"/></div>
<div class="">
<h6 class="font-weight-medium"><a href="#mobile" class="linking"><b>Mobile</b></a></h6>
<p class="mt-3">Owner:  <br/>
    Contact Deatils:<br/> Price:</p>
</div>
</div>
</div>
</div>
{/* <!-- Column -->
<!-- Column --> */}
<div class="col-md-4 wrap-service5-box">
<div class="card card-shadow border-0 mb-4">
<div class="card-body d-flex">
<div class="mr-4 mb-2 text-success-gradiant icon-size">T</div>
<div class="">
<h6 class="font-weight-medium"><a href="#loab-coat" class="linking"><b>Lab Coat</b></a></h6>
<p class="mt-3">Owner:  <br/>
    Contact Deatils:<br/> Price:</p>
</div>
</div>
</div>
</div>
{/* <!-- Column -->
<!-- Column --> */}
<div class="col-md-4 wrap-service5-box">
<div class="card card-shadow border-0 mb-4">
<div class="card-body d-flex">
<div class="mr-4 mb-2 text-success-gradiant icon-size">L</div>
<div class="">
<h6 class="font-weight-medium"><a href="#lan" class="linking"><b>Lan Cable</b></a></h6>
<p class="mt-3">Owner:  <br/>
    Contact Deatils:<br/> Price:</p>
</div>
</div>
</div>
</div>
{/* <!-- Column -->
<!-- Column --> */}
<div class="col-md-4 wrap-service5-box">
<div class="card card-shadow border-0 mb-4">
<div class="card-body d-flex">
<div class="mr-4 mb-2 text-success-gradiant icon-size">F</div>
<div class="">
<h6 class="font-weight-medium"><a href="#books" class="linking"><b>Books</b></a></h6>
<p class="mt-3">Owner:  <br/>
    Contact Deatils:<br/> Price:</p>
</div>
</div>
</div>
</div>
<div class="col-md-12 mt-3 text-center">
<a href="#viewmore" class="btn btn-success-gradiant btn-md border-0 text-white"><span>View More</span></a>
</div>
</div>
</div>
</div>
</div>

  )
}

export default Cards