import renderer from 'react-test-renderer';
import { Appreciation } from './Appreciation';

it('changes the class when hovered', () => {
  let user = {
    id: 1,
    name: 'test',
    email: '',
    password: '',
    role: 'user',
  }
  const dispatch = jest.fn();
  const component = renderer.create(
    <Appreciation user={user} dispatch={dispatch} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
