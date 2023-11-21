type Props = {
  song: SourceSong;
};

const Spinner = ({ song }: Props) => {
  return <div className="loader">Loading...</div>;
};

export default Spinner;
