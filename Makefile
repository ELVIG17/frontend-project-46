install:
	npm install

lint:
	npm run lint

test:
	npm test

test-coverage:
	npm run test:coverage

test-watch:
	npm run test:watch

publish:
	npm publish

.PHONY: test