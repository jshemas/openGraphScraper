# Run all tests (install dependencies first)
test:
	@echo "Installing dependencies..."
	npm install
	@echo "Running tests..."
	@./node_modules/.bin/mocha \
		./tests/index.spec.js