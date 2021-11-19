import ShallowRenderer from 'react-test-renderer/shallow';
import App from "./App";
describe("<App/>", () => {
  const renderer = new ShallowRenderer();

  renderer.render(<App />);
  const result = renderer.getRenderOutput();
  it('El primer Route debe cambiar la ruta hacia "/".', () => {
    expect(result.props.children.props.children[0].props.path).toEqual('/');
  });

  it('El segundo Route debe cambiar la ruta hacia "/home".', () => {
    expect(result.props.children.props.children[1].props.path).toEqual('/home');
  });

})
