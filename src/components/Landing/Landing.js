// import React from 'react';
// import { connect } from 'react-redux';
// import { compose, withState, lifecycle } from 'recompose';
// import { bindActionCreators } from 'redux';

// export const Thing = () => (
//   <div className='Thing'>
//     <p>HERE IS THE LANDING PAGE</p>
//   </div>
// );

// const mapStateToProps = ({ betEvents }) => ({
//   betEvents
// });

// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

// export const recomposedFunction = compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   withState('state', 'setState', 'something'),
//   lifecycle({
//     componentDidMount() {
//       // this.props.getOneBetEvent();
//     }
//   })
// );

// export default recomposedFunction(Thing);
