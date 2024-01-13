import { useEffect, useState } from 'react'
import Card from './components/Card'

function App() {
  // const [businessCard, setBusinessCard] = useState([]);
  const businessCard = [
    {
      name: "Lokeshwar",
      description: "A TA in 100Xdevs",
      interests: ["Ionic", "Open Source", "App Dev"],
      socials: [
        {title: "Linkedin", url: "https://www.linkedin.com"},
        {title: "Github", url: "https://www.github.com"}
      ]
    }
  ]

  // useEffect(function() {
  //   function addBusinessCard() {
  //     const newCard = {
  //       name: "Lokeshwar",
  //       description: "A TA in 100Xdevs",
  //       interests: ["Ionic", "Open Source", "App Dev"],
  //       socials: [
  //         {title: "Linkedin", url: "https://www.linkedin.com"},
  //         {title: "Github", url: "https://www.github.com"}
  //       ]
  //     };

  //     setBusinessCard(function(previousCard) {
  //       return [...previousCard, newCard];
  //     })
  //   }

  //   addBusinessCard();
  // }, []);

  return (
    <>
      <Card businessCard={businessCard} />
    </>
  )
}

export default App
