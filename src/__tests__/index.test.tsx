import { render, screen } from 'utils/test-utils';

test('render home page', async () => {
  render('/');

  await screen.findByRole('button', { name: 'Change theme' });

  expect(
    screen.getByRole('heading', { level: 1 }).textContent,
  ).toMatchInlineSnapshot(`"Welcome to 👋 Golangholic"`);
});
