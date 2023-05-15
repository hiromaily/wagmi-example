# Refer to
# https://mswjs.io/docs/getting-started/mocks
# 
.PHONY: setup-msw
setup-msw:
	# setup worker
	npx msw init ./public --save
	mkdir src/mocks
	touch src/mocks/handlers.ts
	touch src/mocks/browser.ts
	touch src/mocks/server.ts
	touch src/mocks/worker.ts
