// import React from 'react';
// import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { addAnswer, updateAnswer } from '../../actions';
// import './BetEventFormAnswer.css';

// export const BetEventFormAnswer = ({ answerId, questionId }) => {
//   const dispatch = useDispatch();
//   return (
//     <div className='answer-container' key={answerId}>
//       {answerId === 1 && (
//         <div className='plus'>
//           <Button
//             icon='pi pi-plus'
//             className='p-button-rounded p-button-success p-button-outlined'
//             tooltip='Add Answer'
//             tooltipOptions={{ position: 'right' }}
//             style={{ width: '1.5em', height: '1.5em' }}
//             onClick={() => dispatch(addAnswer(questionId))}
//           />
//         </div>
//       )}
//       <div className='answer-inputs'>
//         <div className='answer'>
//           <h5 className='login-label'>Answer {answerId}</h5>
//           <InputText
//             className='p-inputtext-sm wide-input'
//             onChange={(event) =>
//               dispatch(
//                 updateAnswer({
//                   questionId,
//                   answerId,
//                   key: 'text',
//                   value: event.target.value
//                 })
//               )
//             }
//           />
//         </div>
//         <div className='odds'>
//           <h5 className='login-label'>Odds</h5>
//           <InputText
//             className='p-inputtext-sm small-input'
//             onChange={(event) =>
//               dispatch(
//                 updateAnswer({
//                   questionId,
//                   answerId,
//                   key: 'odds',
//                   value: event.target.value
//                 })
//               )
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// BetEventFormAnswer.propTypes = {
//   questionId: PropTypes.number,
//   answerId: PropTypes.number
// };

// export default BetEventFormAnswer;
