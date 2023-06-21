import React from 'react';

const rtl = document.getElementsByTagName('html')[0].getAttribute('dir');
const withDirection = Component => props => {
  // const onChange = () => {
  //   console.log('change');
  // }
  // console.log(props,'props with direction')
  return <Component {...props} data-rtl={rtl} />;
};

export default withDirection;
export { rtl };
