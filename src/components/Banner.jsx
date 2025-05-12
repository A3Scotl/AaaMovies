  import React from 'react';

  const Banner = () => {
    return (
      <div
        className="position-relative custom-banner text-white"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <div className="container py-md-5 custom-banner_content">  
        
          <h1 className="fw-light display-4" style={{paddingTop:150}}> <h5 style={{color:"#CCFF00"}}>AaaMovies</h5>Unlimited <span style={{color:"#CCFF00"}}>Entertainment,</span> <br />Movies, TVs shows, & More.</h1>
          <div className="py-3 d-flex gap-3">
            <span className="badge text-dark" style={{backgroundColor:'#FFF'}}>Movie</span>
            <span className="badge text-white border border-1 px-2 align-items-center d-flex" style={{fontSize:12}}>HD / 4K</span>
            <span className=" text-white ">Action, Drama...</span>

            <span className="">2025</span>
          </div>

          <p className="w-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo totam facilis, ab fuga doloribus earum a quod quidem dicta provident aspernatur neque animi? Explicabo deserunt cum eos voluptatibus quis soluta.
          </p>

          <div className="d-flex align-items-center ">
            <button className="btn fs-5 custom-btn rounded d-flex align-items-center badge fw-light" >
              <i className="bi bi-play-fill fs-3"></i>
              PLAY NOW
            </button>
            {/* <button className="btn custom-btn rounded-circle me-2" style={{ width: '48px', height: '48px' }}>
              <i className="bi bi-heart fs-5"></i>
            </button>
            <button className="btn custom-btn rounded-circle" style={{ width: '48px', height: '48px' }}>
              <i className="bi bi-info-circle fs-5"></i>
            </button> */}
          </div>
        </div>

      </div>
    );
  };

  export default Banner;
