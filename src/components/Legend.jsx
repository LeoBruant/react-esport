export default function Legend({ legend }) {
    return (
        <div className="mx-auto col-12 col-md-10 col-lg-8 col-xl-6 d-flex justify-content-between">
            {legend.map(({ color, label }) => (
                <div className="d-flex align-items-center justify-content-center" key={label} style={{ width: 'inherit' }}>
                    <div className="col-1" style={{ backgroundColor: color, height: '2px' }}></div>
                    <p className="mx-1 my-0">{label}</p>
                </div>
            ))}
        </div>
    )
}
