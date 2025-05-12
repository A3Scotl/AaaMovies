  import React from 'react';

  const Banner = () => {
    return (
      <div
        className="position-relative text-white"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <div className="container py-md-5">  
          <h1 className="fw-bold display-4" style={{paddingTop:100}}>Lãnh Địa Tử Chiến</h1>
          <p className="fs-5"  style={{color:"#CCFF00"}}>MobLand</p>

          <div className="mb-2">
            <span className="badge text-dark me-1" style={{backgroundColor:'#CCFF00'}}>IMDb</span>
            <span className="badge bg-light text-dark me-1">4K</span>
            <span className="badge bg-secondary me-1">T16</span>
            <span className="badge bg-secondary me-1">2025</span>
            <span className="badge bg-secondary me-1">Phần 1</span>
            <span className="badge bg-secondary">Tập 7</span>
          </div>

          <div className="mb-3">
            {['Chính Kịch', 'Hành Động', 'Gay Cấn', 'Hình Sự'].map((genre, i) => (
              <span key={i} className="badge rounded-pill bg-dark border me-1">{genre}</span>
            ))}
          </div>

          <p className="w-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo totam facilis, ab fuga doloribus earum a quod quidem dicta provident aspernatur neque animi? Explicabo deserunt cum eos voluptatibus quis soluta.
          </p>

          <div className="d-flex align-items-center">
            <button className="btn custom-btn rounded-circle me-3" style={{ width: '48px', height: '48px' }}>
              <i className="bi bi-play-fill fs-4"></i>
            </button>
            <button className="btn custom-btn rounded-circle me-2" style={{ width: '48px', height: '48px' }}>
              <i className="bi bi-heart fs-5"></i>
            </button>
            <button className="btn custom-btn rounded-circle" style={{ width: '48px', height: '48px' }}>
              <i className="bi bi-info-circle fs-5"></i>
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="position-absolute bottom-0 end-0 p-3 d-flex gap-2">
          {[...Array(6)].map((_, i) => (
            <img
              key={i}
              src={`/thumb${i + 1}.jpg`}
              className="rounded"
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              alt={`thumb${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  export default Banner;
