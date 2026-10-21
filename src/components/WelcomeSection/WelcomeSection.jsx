import './WelcomeSection.css'

function WelcomeSection() {
  return (
    <section className="welcome">
      <div>
        <h2>Good morning, Oksana 👋</h2>
        <p>Here is what's happening with your inventory today.</p>
      </div>

      <span className="date-label">Stock overview</span>
    </section>
  )
}

export default WelcomeSection