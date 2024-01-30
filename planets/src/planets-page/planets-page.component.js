import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Button } from '@react-mf/styleguide';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
  },
};
Modal.setAppElement('body');

// let oldUrl = '';

window.addEventListener('single-spa:before-routing-event', (evt) => {
  // new URL(evt.detail.oldUrl).pathname === '/planets' && new URL(evt.detail.newUrl).pathname === '/people'
  // console.log('evt.detail', evt.detail);
  // console.log('oldUrl', oldUrl);

  if (
    new URL(evt.detail.oldUrl).pathname === '/planets' &&
    new URL(evt.detail.newUrl).pathname === '/people'
  ) {
    // oldUrl = evt.detail.oldUrl;

    // if (window.confirm('Do you really want to leave?')) {
    //   window.isNavigationBlocked = false;
    //   oldUrl = '';
    // } else {
      evt.detail.cancelNavigation();
    // }
  }
});

window.addEventListener('single-spa:routing-event', (evt) => {
  console.log('app change', evt);
});

export default function PlanetPage(props) {
  const history = useHistory();
  const [locationBlock, setLocationBlock] = React.useState(false);

  useEffect(() => {
    window.isNavigationBlocked = locationBlock;
  }, [locationBlock]);

  const handleSave = () => {
    setTimeout(() => {
      setLocationBlock(false);
      history.push('/planets/test');
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <a href="/planets/test" style={{ textDecoration: 'underline' }}>
        Home link
      </a>

      <Link to="/planets/test" style={{ textDecoration: 'underline' }}>
        Router link
      </Link>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Button
          onClick={() => {
            setLocationBlock((prevValue) => !prevValue);
          }}
        >
          Block
        </Button>

        {locationBlock ? <p color="red">Location Blocked</p> : <p color="green">Location Not Blocked</p>}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={() => history.push('/planets/test')}>Cancel</Button>
      </div>
    </div>
  );
}
