axios.get('http://localhost:3000/cats')
  .then(result => {
    console.log(result);
    const cats = result.data.data
    const items = cats.reduce((acc, cat) => acc + `<li>${cat.name}</li>`, '')
    document.querySelector('ul').innerHTML = items
    /*
    the above can also be written as...

      for (const cat of cats) {
        const newCatEl = document.createElement('li')
        newCatEl.textContent = cat.name
        document.querySelector('ul').appendChild('newCatEl')
      }

      -or-

      let string = ''
      for (const cat of cats) {
        const newCat = `<li>${cat.name}</li>`
        string += newCat
      }

    */
  })
  .catch(err => {
    //add console.log(err) to spit out the actual error
    console.log(err);
    console.log('Do not worry, everything is fine.')
  })

  // Add an event listener to the create new cat button
  const newCatForm = document.querySelector('#newCatForm');
  newCatForm.style.display = 'none';

  // On click, show a form on the page to create a new cat
  const newCatButton = document.querySelector('#posts-create');
  newCatButton.addEventListener('click', function() {
    console.log('CLICKED!');
    newCatForm.style.display = 'inline';
  });

  // On form submit, hide the form and clear the input
  // On form submit, post a new cat to our Cats API
  // On form submit, add to the list of cats on the page
  newCatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('SUBMITTED!');

    const inputValue = document.querySelector('#newCatInput').value
    console.log(inputValue)
    const newCat = {
      name: inputValue
    }

    axios.post('http://localhost:3000/cats', newCat)
      .then((result) => {
        console.log('ALL GOOD', result);
      })
      .catch((err) => {
        console.log(err);
      })

    window.location.reload();
  })
