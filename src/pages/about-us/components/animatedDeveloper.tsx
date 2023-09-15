import '../about.scss';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  name: string;
}

function AnimatedDeveloper({ name }: Props) {
  return (
    <div id={name}>
      <div className="human">
        <div className="hat"></div>
        <div className="eyes left">
          <div className="bubble"></div>
          <div className="smallBubble"></div>
        </div>
        <div className="eyes right">
          <div className="bubble"></div>
          <div className="smallBubble"></div>
        </div>
        <div className="mouse"></div>
      </div>
      <div className="arms left"></div>
      <div className="arms right"></div>
      <div className="legs left"></div>
      <div className="legs right"></div>
    </div>
  );
}

export default AnimatedDeveloper;
