#### Accomplishments
1. Updated dependencies
2. Solved a postgres install issue
3. Fixed hydration issues
4. Fixed a XSS vulnerability
5. Added types
6. Used a real database
7. Stopped fetching all rows and moved text search to the DB query
8. Debounced making the network call from the front end
9. Improved the UI

#### If I Had More Time I'd
1. Add tests. I'd start with component and API tests. Component tests would use vitest, react testing library and mock service worker.
2. Add pagination in combination with text search. I'd update the browser's URL on page change so the back button works as expected.
3. Look into query performance optimizations including indexing. What I have now is better than always fetching every row, but I'm sure there's more room for improvement.
4. Consider using an http library on the front end to manage caching and loading/error states.
5. Add eslint for code consistency.
6. Make the UI more appealing. Also, add loading states and handle errors.

#### Reflections
I'm pleased with how this turned out. The postgres issue I mentioned in [this PR](https://github.com/jpodwys/solace/pull/4) was certainly unfamimliar to me and using next and drizzle for the first time was fun.
