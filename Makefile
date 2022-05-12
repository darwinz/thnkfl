run:
	docker-compose -f docker-compose.yml --env-file ./.env up -d --remove-orphans

teardown:
	-docker-compose down -v --remove-orphans
