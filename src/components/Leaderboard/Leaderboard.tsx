export const Leaderboard = (props: any) => {
  return (
    <div className='manage'>
      <p>{props.match.params.id}</p>
    </div>
  );
};

export default Leaderboard;
