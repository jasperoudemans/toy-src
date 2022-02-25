export default function Splash () {
  return (
    <div className="splash">
      <section className="section splash px-5 pb-5" style={{display:'flex'}}>
        <div className="splashtxt">
            <h2 style={{fontSize:42}}>
                Sell. Trade. Play again !
            </h2>
            <p>A simple way to buy, sell or trade used toys locally.</p>
            <div class="py-3"> 
              <button class="nobg znavBtn" style={{float: 'left', marginRight: 10, marginLeft: 0}}>Login</button>
              <button class="nobg znavBtn">Signup!</button> 
            </div>
        </div>
      </section>
    </div>
  )
}