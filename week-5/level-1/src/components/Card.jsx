import { React } from 'react';

function Card({ businessCard }) {
  return (  
    <>
      {businessCard.map(function(card) {
        const { name, description, interests, socials } = card;
        return (
          <div>
            <h1>{ name }</h1>
            <p>{ description }</p>
            <h2>Interests</h2>
            {interests.map(function(interest, index) {
              return <p key={index}>{interest}</p>
            })}
            {socials.map(function(social, index) {
              return (
                <a target="_blank" href={social.url} key={index}>
                  <button>{social.title}</button> 
                </a>
              )
            })}
          </div>
        )
      })}
    </>
  );
}

export default Card;