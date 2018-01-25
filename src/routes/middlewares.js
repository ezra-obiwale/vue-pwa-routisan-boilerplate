import VueDoo from '@ezraobiwale/vue-doo'
import VueCookie from 'vue-cookie'

const store = VueDoo.store({
  name: process.env.STORE_NAME
});

const guest = (to, from, next) => {
  // console.log(from.path);
  // check that token exists. Cancel otherwise
  if (VueCookie.get('uak')) {
    next(false);
  }
  else {
    next();
  }
};
const auth = (to, from, next) => {
  // check that token exists. Cancel otherwise
  if (!VueCookie.get('uak')) {
    next(false);
  }
  else {
    next();
  }
};
const track_page = (to, from, next) => {
  // save the last visited page
  store.set('last_page', to.path + location.search);
  next();
};

export {
  guest,
  auth,
  track_page
};
