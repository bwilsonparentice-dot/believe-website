#!/usr/bin/env bash
# Runs the access and validation checks against a throwaway local Postgres
# database. Usage: supabase/tests/run-local.sh  (needs psql and a local server;
# set PGHOST/PGUSER/PGPORT as needed). It never touches a Supabase project.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
db="cb_test_$$"
createdb "$db"
trap 'dropdb --if-exists "$db"' EXIT
export PGOPTIONS="-c client_min_messages=warning"
psql -q -v ON_ERROR_STOP=1 -d "$db" -f "$here/local_stub.sql"
psql -q -v ON_ERROR_STOP=1 -d "$db" -f "$here/../migrations/0001_create_believers.sql"
# run it twice: the migration must be safe to re-apply
psql -q -v ON_ERROR_STOP=1 -d "$db" -f "$here/../migrations/0001_create_believers.sql"
PGOPTIONS="" psql -q -v ON_ERROR_STOP=1 -d "$db" -f "$here/access_and_validation.sql" 2>&1 | grep -E "ok -|FAILED|ERROR|ALL CHECKS" 
