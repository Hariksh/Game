import { useState, useRef } from 'react'
import './App.css'

const symbols = [
  'https://i.imgur.com/E9t6a8R.jpeg',
  'https://i.imgur.com/4AqE23q.jpeg',
  'https://i.imgur.com/K72zPbh.jpeg',
  'https://i.imgur.com/1y2q4uy.jpeg',
  'https://i.imgur.com/H2NyaAJ.jpeg',
  'https://i.imgur.com/XPSt6Zs.jpeg',
  'https://i.imgur.com/IBZKkmH.jpeg',
  'https://i.imgur.com/2tYqxxl.jpeg'
]

const funnyMessages = [
  "Oops! Even your WiFi connection is more stable than your luck! 📶",
  "🎉 Congratulations! You just won... absolutely nothing! 🎊",
  "Your luck just got a blue screen of death. 💻💀",
  "This spin was sponsored by ‘Better Luck Next Time Inc.’",
  "If bad luck was a stock, you’d be a billionaire. 📉💰",
  "Even a magic 8-ball would just say 'Nope.' 🎱",
  "You had a better chance of getting a text back from your crush. 💔",
  "Your luck is rarer than a unicorn riding a rainbow. 🦄🌈",
  "Not even AI can predict when you'll win. 🤖💀",
  "Your luck is in stealth mode… permanently. 🥷",
  "Statistically, you should've won by now. But here we are. 📊😂",
  "Even the laws of probability are laughing at you. 😂📏",
  "Fun fact: Crying increases your chances of winning by 0%. 😭",
  "Your horoscope predicted this disaster. 🔮",
  "You’d have a better chance winning at rock-paper-scissors… with yourself. ✊✋✌️",
  "Your winning moment is buffering… indefinitely. ⏳",
  "Maybe try using cheat codes? Oh wait, still won’t work. 🎮",
  "The slot machine just filed a restraining order against you. 🚫"
];

const initialFunnyText = "😂 Welcome to the most **useless** gambling simulator ever! 🎰 " +
  "The only thing spinning here is your hope and dreams... into the void! 🌪️";

function App() {
  const [slots, setSlots] = useState([symbols[0], symbols[1], symbols[2]])
  const [spinning, setSpinning] = useState(false)
  const [message, setMessage] = useState("Feeling lucky? Give it a spin! 🎰")
  const [showFunnyText, setShowFunnyText] = useState(true);
  const intervals = useRef([])

  const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)]

  const startSpin = () => {
    if (spinning) return
    setSpinning(true)
    setMessage("Rolling the dice of destiny... 🎲 Hold tight!")
    setShowFunnyText(false);

    intervals.current = [
      setInterval(() => setSlots(prev => [getRandomSymbol(), prev[1], prev[2]]), 50),
      setInterval(() => setSlots(prev => [prev[0], getRandomSymbol(), prev[2]]), 50),
      setInterval(() => setSlots(prev => [prev[0], prev[1], getRandomSymbol()]), 50)
    ]
  }

  const stopSpin = () => {
    if (!spinning) return
    setSpinning(false)
    intervals.current.forEach(clearInterval)
    setShowFunnyText(true);

    const newSlots = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]
    setSlots(newSlots)

    if (newSlots.every(slot => slot === newSlots[0])) {
      setMessage("🎉 JACKPOT! YOU WON! 🎉")
    } else {
      setMessage(funnyMessages[Math.floor(Math.random() * funnyMessages.length)])
    }
  }

  return (
    <div className="slot-machine">
      {showFunnyText && <div className="funny-text">{initialFunnyText}</div>}
      <div className="slots">
        {slots.map((slot, index) => (
          <div key={index} className="box">
            <img src={slot} alt={`Slot ${index}`} className="slot-image" />
          </div>
        ))}
      </div>
      <div className="controls">
        <button 
          onClick={startSpin} 
          disabled={spinning}
          className="spin-button"
        >
          {spinning ? 'Spinning...' : 'Start!'}
        </button>
        <button 
          onClick={stopSpin} 
          disabled={!spinning}
          className="spin-button"
        >
          Stop!
        </button>
      </div>
      <div className="message">{message}</div>
    </div>
  )
}

export default App
