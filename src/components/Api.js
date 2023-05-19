
export default function getInitialCards() {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
    headers: {
      authorization: '7de2994e-87c5-4c41-b3ee-528880f7cb41'
    }
  })
    .then(res => {
      console.log(res)
      if (res.ok) {
        return res.json();
      } else {

      }
    })

};

