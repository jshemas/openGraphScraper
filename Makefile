# Run all tests (install dependencies first)
test:
	@echo "Installing dependencies..."
	cd app; \
		npm install
	cd ..;
	@echo "Running tests..."
	@./node_modules/.bin/mocha \
		./tests/index.spec.js