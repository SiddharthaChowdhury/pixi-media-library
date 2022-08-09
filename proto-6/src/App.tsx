import logo from './logo.svg';
import * as RP from '@inlet/react-pixi';

const App = () => {
  return (
    <RP.Container>
      <RP.Sprite image={logo} x={640} y={100} anchor={0.5} />
    </RP.Container>
  );
};

export default App;
